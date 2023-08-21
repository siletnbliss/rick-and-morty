"use client";

import { CharacterResponse } from "@/lib/services/rick-and-morty.service";
import { CharactersTable } from "./Table";
import { PageHeader } from "../ui/page-header";
import { CustomButton } from "../ui/button";
import { usePaginationFetcher } from "@/hooks/use-pagination-fetcher";
import { FeedbackWrapper } from "../ui/feedback-wrapper";
import { useDisclosure } from "@/hooks/use-disclosure";
import { CustomDialog } from "../ui/dialog";
import { CharacterForm } from "./Form";
import {
  Character,
  CharacterGender,
  CharacterStatus,
  CreateCharacter,
} from "@/types/character";
import { useToast } from "../ui/use-toast";
export const CharactersManager = () => {
  const { visible, toggle } = useDisclosure();
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
  } = usePaginationFetcher<CharacterResponse>("/api/characters", {
    pageIndex: 1,
  });

  const addCharacter = (values: Character | CreateCharacter) => {
    if (!data?.results) {
      toast({
        variant: "destructive",
        title: "Can't add character",
        description: "Please wait for characters to load",
      });
      return;
    }
    if ("id" in values) {
      setData(() => ({
        ...data,
        results: data?.results.map((ch) => {
          if (ch.id === values.id) {
            ch = values;
            return ch;
          }
          return ch;
        }),
      }));

      return;
    }
    const now = new Date();

    const newCharacter: Character = {
      ...values,
      id: now.toISOString(),
      created: now.toISOString(),
      status: values.status as CharacterStatus,
      gender: values.gender as CharacterGender,
    };

    setData(() => ({
      ...data,
      results: [newCharacter, ...data?.results],
    }));

    toast({
      title: "Character added",
      description: `${newCharacter.name} has been added to the records`,
    });

    toggle();
  };

  const FormDialog = (
    <CustomDialog
      open={visible}
      onOpenChange={toggle}
      title="Create character"
      description="            Complete this form to add a brand new Rick and Morty Character
    "
      className=" sm:max-w-screen-md"
    >
      <CharacterForm onSubmit={addCharacter} />
    </CustomDialog>
  );

  return (
    <div>
      <PageHeader
        title="Characters"
        right={<CustomButton onClick={toggle}>Create Character</CustomButton>}
      />
      {FormDialog}
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
