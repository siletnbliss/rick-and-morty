import { useEffect, useMemo, useState } from "react";
import { useFetcher } from "./use-fetcher";

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}
export const usePaginationFetcher = <Data, >(
  url: string,
  initialPagination?: Partial<PaginationState>
) => {
  const { data, setData, loading, error, setFilters, filters } =
    useFetcher<Data>(url);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: initialPagination?.pageIndex || 0,
    pageSize: initialPagination?.pageSize || 20,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  useEffect(() => {
    const handleFetch = () => {
      return setFilters((filters) => {
        const foundFilter = filters.find((f) => f.id === "page");
        if (foundFilter) {
          return filters.map((f) => {
            if (f.id === "page") {
              f.value = String(pagination.pageIndex);
              return f;
            }
            return f;
          });
        }
        return [
          ...filters,
          { id: "page", value: String(pagination.pageIndex) },
        ];
      });
    };

    handleFetch();
  }, [pagination, setFilters]);

  return {
    data,
    setData,
    loading,
    setPagination,
    pagination,
    error,
    setFilters,
    filters,
  };
};
