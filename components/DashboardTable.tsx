"use client";
import { DataTable } from "./ui/data-table";
import { columns, USER } from "./ui/column";

export default function DashboardTable({ users }: { users: USER[] }) {
  return (
    <div className="max-w-200  mx-auto">
      <DataTable
        columns={columns}
        data={users}
      />
    </div>
  );
}
