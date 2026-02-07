"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "./button";
import { Checkbox } from "@/components/ui/checkbox";

export type USER = {
  name: string;
  fullName: string;
  isBlocked: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  email: string;
};

export const columns: ColumnDef<USER>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isBlocked",
    header: "Status",
    cell: ({ row }) => {
      const { isBlocked, isVerified } = row.original;
      if (isBlocked) return "Blocked";
      return isVerified ? "Active" : "Unverified";
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-right">Last Seen</div>,
    cell: ({ row }) => {
      function calculateTimeDifference(date: number) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        switch (true) {
          case date < minute:
            return "Just now";
          case date < hour:
            return `${Math.floor(date / minute)} minutes ago`;
          case date < day:
            return `${Math.floor(date / hour)} hours ago`;
          default:
            return `${Math.floor(date / day)} days ago`;
        }
      }

      // Use Date.parse for ISO strings, or new Date().getTime()
      const lastSeenDate = Date.parse(row.getValue("updatedAt"));
      const timeDiff = Date.now() - lastSeenDate;

      return (
        <div className="text-right font-medium">
          {calculateTimeDifference(timeDiff)}
        </div>
      );
    },
  },
];
