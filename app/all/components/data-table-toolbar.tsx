"use client";

import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "../components/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <DataTableViewOptions table={table} />
    </div>
  );
}
