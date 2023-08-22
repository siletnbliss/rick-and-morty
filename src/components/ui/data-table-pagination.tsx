import { Table } from "@tanstack/react-table";

import { CustomButton as Button } from "./button";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  initialPage?: number;
  totalItems?: number;
}

export function DataTablePagination<TData>({
  table,
  initialPage,
  totalItems = 0,
}: DataTablePaginationProps<TData>) {
  const currentPage =
    table.getState().pagination.pageIndex + (initialPage === 0 ? 1 : 0);
  const disablePrevPage = () => currentPage === initialPage;
  const currentDisplay = table.getState().pagination.pageSize * currentPage;
  const lastPage = table.getPageCount() - 1 || 0;
  return (
    <div className="flex items-center justify-between px-2 ">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {currentDisplay - table.getState().pagination.pageSize + 1}-
        {currentDisplay > totalItems ? totalItems : currentDisplay} of{" "}
        {totalItems} results
      </div>
      <div className="ml-auto flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {lastPage > 0 ? lastPage : initialPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(initialPage ?? 0)}
            disabled={disablePrevPage() || !table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            style={{ zIndex: 0 }}
            onClick={() => table.previousPage()}
            disabled={disablePrevPage() || !table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
