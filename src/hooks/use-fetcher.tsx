"use-client";
import { handleFetch } from "@/lib/fetching";
import { useEffect, useMemo, useState } from "react";
export const useFetcher = <Result,>(url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Result | null>(null);
  const [fetcherFilters, setFilters] = useState<{ id: string; value: any }[]>(
    []
  );

  const filters = useMemo(() => fetcherFilters, [fetcherFilters]);
  useEffect(() => {
    const fetcher = async (): Promise<Result | null> => {
      setLoading(true);
      setError(null);
      try {
        let parsedFilters: Record<string, string> = {};
        filters.forEach((filter) => {
          parsedFilters[filter.id] = filter.value;
        });
        const newData = await handleFetch<Result>(url, {
          ...parsedFilters,
        });
        setData(newData);
        setLoading(false);
        return newData;
      } catch (error) {
        setError(
          error &&
            typeof error == "object" &&
            "message" in error &&
            typeof error.message === "string"
            ? error.message
            : "Unknown error"
        );
      }
      setLoading(false);
      return null;
    };
    fetcher();
  }, [filters, url]);

  return {
    data,
    error,
    loading,
    setData,
    filters,
    setFilters,
  };
};
