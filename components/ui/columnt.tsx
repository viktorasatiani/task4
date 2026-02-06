"use client";

import { ColumnDef } from "@tanstack/react-table";
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
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
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
  { accessorKey: "updatedAt", header: "Last Seen" },
];
