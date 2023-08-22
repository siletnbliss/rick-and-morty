"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationOptions,
  TableOptions,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableFilterProps, DataTableFilters } from "./data-table-filters";

export type PaginationProps = PaginationOptions & {
  pageSize: number;
  pageIndex: number;
  pageZero?: boolean;
  totalItems?: number;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: PaginationProps;
  filters: DataTableFilterProps<TData>["filters"];
  onFiltersChange?: TableOptions<TData>["onColumnFiltersChange"];
  stateFilters: ColumnFiltersState;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  filters,
  onFiltersChange,
  stateFilters,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(!pagination.manualPagination && {
      getPaginationRowModel: getPaginationRowModel(),
    }),
    ...pagination,
    initialState: {
      pagination: {
        pageIndex: pagination.pageZero ? 0 : 1,
        pageSize: pagination.pageSize,
      },
    },
    state: {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      columnFilters: stateFilters,
    },
    onColumnFiltersChange: onFiltersChange,
  });
  const initialPage = pagination.pageZero ? 0 : 1;
  return (
    <div className="space-y-5">
      <DataTableFilters filters={filters} table={table} />
      <DataTablePagination
        table={table}
        initialPage={initialPage}
        totalItems={pagination.totalItems}
      />
      <div className="rounded-md border mt-3">
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
                            header.getContext()
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
                        cell.getContext()
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
