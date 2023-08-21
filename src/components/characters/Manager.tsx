"use client";

import { CharacterResponse } from "@/lib/services/rick-and-morty.service";
import { CharactersTable } from "./Table";
import { PageHeader } from "../ui/page-header";
import { CustomButton } from "../ui/button";
import { usePaginationFetcher } from "@/hooks/use-pagination-fetcher";
import { FeedbackWrapper } from "../ui/feedback-wrapper";

export const CharactersManager = () => {
  const {
    error,
    data,
    loading,
    setData,
    setPagination,
    pagination,
    setFilters,
    filters,
  } = usePaginationFetcher<CharacterResponse>("/api/characters", {
    pageIndex: 1,
  });

  return (
    <div>
      <PageHeader
        title="Characters"
        right={<CustomButton>Create Character</CustomButton>}
      />
      <FeedbackWrapper loading={loading} error={error}>
        <CharactersTable
          pagination={{
            pageCount: data?.info.pages ? data.info.pages + 1 : -1,
            manualPagination: true,
            totalItems: data?.info.count,
            pageZero: false,
            ...pagination,
            onPaginationChange: (props) => {
              setPagination(props);
            },
          }}
          data={data?.results || []}
          onFiltersChange={setFilters}
          stateFilters={filters}
        />
      </FeedbackWrapper>
    </div>
  );
};
