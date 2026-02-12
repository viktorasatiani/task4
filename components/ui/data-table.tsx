"use client";

import {
  blockUsersApi,
  unblockUsersApi,
  deleteUsersApi,
  deleteUnverifiedApi,
} from "@/lib/user-management-api";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "./button";
import {
  BrushCleaning,
  LockKeyhole,
  LockKeyholeOpen,
  Trash2,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends { _id: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const showToast = (message: string, type: "success" | "error" | "info") => {
    toast(message, {
      type: type,
      autoClose: 2000,
      onClose: () => {
        router.refresh();
      },
    });
  };

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const selectedRowData = table
    .getSelectedRowModel()
    .flatRows.map((row) => row.original._id);
  console.log(selectedRowData, "selected");

  const blockUsers = async () => {
    try {
      const data = await blockUsersApi(selectedRowData);
      console.log("response from block ", data);
      if (data.success) {
        showToast("User blocked successfully!", "success");
        setRowSelection({});
      } else {
        showToast(data.message, "info");
      }
    } catch (error) {
      console.error("Error blocking users:", error);
      showToast("Failed to block user(s).", "error");
    }
  };
  const unblockUsers = async () => {
    try {
      const data = await unblockUsersApi(selectedRowData);
      if (data.success) {
        showToast("User has been Unblocked successfully!", "success");
        setRowSelection({});
      } else {
        showToast(data.message, "info");
      }
    } catch (error) {
      console.error("Error unblocking users:", error);
      showToast("Failed to unblock user(s).", "error");
    }
  };
  const deleteUsers = async () => {
    try {
      const data = await deleteUsersApi(selectedRowData);
      if (data.success) {
        showToast("user has been deleted succesfully!", "success");
        setRowSelection({});
      } else {
        showToast(data.message, "info");
      }
    } catch (error) {
      showToast(error as string, "error");
    }
  };

  const deleteUnverified = async () => {
    try {
      const data = await deleteUnverifiedApi(selectedRowData);
      console.log(data, "data from unverified");
      if (data.success) {
        showToast("Unverified users deleted successfully!", "success");
        setRowSelection({});
      } else {
        showToast(data.message, "info");
      }
    } catch (error) {
      showToast(error as string, "error");
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center py-4 gap-3">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex justify-between items-center gap-4">
          <Button
            disabled={selectedRowData.length <= 0}
            variant="outline"
            size="icon"
            onClick={() => blockUsers()}
          >
            <LockKeyhole />
          </Button>
          <Button
            disabled={selectedRowData.length <= 0}
            variant="outline"
            size="icon"
            onClick={() => unblockUsers()}
          >
            <LockKeyholeOpen />
          </Button>
          <Button
            disabled={selectedRowData.length <= 0}
            variant="destructive"
            size="icon"
            onClick={() => deleteUsers()}
          >
            <Trash2 />
          </Button>
          <Button
            disabled={selectedRowData.length <= 0}
            variant="destructive"
            size="icon"
            onClick={() => deleteUnverified()}
          >
            <BrushCleaning />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
