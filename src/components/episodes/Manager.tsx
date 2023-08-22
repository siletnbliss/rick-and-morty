"use client";

import { EpisodeResponse } from "@/lib/services/rick-and-morty.service";
import { EpisodesTable } from "./Table";
import { PageHeader } from "../ui/page-header";
import { usePaginationFetcher } from "@/hooks/use-pagination-fetcher";
import { FeedbackWrapper } from "../ui/feedback-wrapper";
import { useDisclosure } from "@/hooks/use-disclosure";
import { CustomDialog } from "../ui/dialog";

import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { Episode } from "@/types/episode";
import { EpisodeForm } from "./Form";

export const EpisodesManager = () => {
  const { visible: editVisible, toggle: editToggle } = useDisclosure();

  const { toast } = useToast();
  const {
    error,
    data,
    loading,
    setData,
    setPagination,
    pagination,
    setFilters,
    filters,
  } = usePaginationFetcher<EpisodeResponse>("/api/episodes", {
    pageIndex: 1,
  });

  const [selected, setSelected] = useState<Episode | undefined>(undefined);
  const findSelected = (id: number) => data?.results.find((ep) => ep.id === id);

  const upsertEpisode = (values: Episode) => {
    if (!data?.results) {
      toast({
        variant: "destructive",
        title: "Can't add episode",
        description: "Please wait for episodes to load",
      });
      return;
    }
    if ("id" in values) {
      setData(() => ({
        ...data,
        results: data?.results.map((ch) => {
          if (ch.id === values.id) {
            ch = { ...ch, ...values };
            return ch;
          }
          return ch;
        }),
      }));

      toast({
        title: "Episode updated",
        description: `${values.name} has been modified`,
      });
      editToggle();
      return;
    }
  };

  const EditFormDialog = (
    <CustomDialog
      open={editVisible}
      onOpenChange={editToggle}
      title="Edit episode"
      description="Modify the fields for the selected episode
    "
      className=" sm:max-w-screen-md"
    >
      {selected && (
        <EpisodeForm initialValues={selected} onSubmit={upsertEpisode} />
      )}
    </CustomDialog>
  );

  return (
    <div>
      <PageHeader title="Episodes" />
      {EditFormDialog}
      <FeedbackWrapper loading={loading} error={error}>
        <EpisodesTable
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
          onEdit={(id) => {
            setSelected(findSelected(Number(id)));
            editToggle();
          }}
          data={data?.results || []}
          onFiltersChange={setFilters}
          stateFilters={filters}
        />
      </FeedbackWrapper>
    </div>
  );
};
