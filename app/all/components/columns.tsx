"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {new Date(row.getValue("date")).toLocaleDateString()}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "pullups",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pullups" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("pullups")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "pushups",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pushups" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("pushups")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "squats",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Squats" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("squats")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "first mile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Mile" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {Math.floor((row.getValue("first mile") as number) / 60)}:
            {((row.getValue("first mile") as number) % 60)
              .toString()
              .padStart(2, "0")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "second mile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Second Mile" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {Math.floor((row.getValue("second mile") as number) / 60)}:
            {((row.getValue("first mile") as number) % 60)
              .toString()
              .padStart(2, "0")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
