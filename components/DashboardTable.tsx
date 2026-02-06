"use client";
import { signOut } from "next-auth/react";
import { DataTable } from "./ui/data-table";
import { columns, USER } from "./ui/columnt";

export default function DashboardTable({ users }: { users: USER[] }) {
  console.log(users, "users from table");
  return (
    <div>
      <DataTable
        columns={columns}
        data={users}
      />
      <button onClick={() => signOut()}>signout</button>
    </div>
  );
}
