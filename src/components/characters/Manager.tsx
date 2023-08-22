"use client";

import { CharacterResponse } from "@/lib/services/rick-and-morty.service";
import { CharactersTable } from "./Table";
import { PageHeader } from "../ui/page-header";
import { CustomButton } from "../ui/button";
import { usePaginationFetcher } from "@/hooks/use-pagination-fetcher";
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
import {  useState } from "react";
import { CharacterStatusForm } from "./StatusForm";
export const CharactersManager = () => {
  const { visible, toggle, open } = useDisclosure();
  const { visible: editVisible, toggle: editToggle } = useDisclosure();
  const { visible: statusVisible, toggle: statusToggle } = useDisclosure();

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

  const [selected, setSelected] = useState<Character | undefined>(undefined);
  const findSelected = (id: string | number) =>
    data?.results.find((char) => char.id === id);

  const updateStatus = (values: Pick<Character, "status" | "id" | "name">) => {
    if (data?.results) {
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
      statusToggle();
      toast({
        title: "Status updated",
        description: `${values.name} is ${values.status} now`,
      });
    }
  };

  const upsertCharacter = (values: Character | CreateCharacter) => {
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
            ch = { ...ch, ...values };
            return ch;
          }
          return ch;
        }),
      }));

      toast({
        title: "Character updated",
        description: `${values.name} has been modified`,
      });
      editToggle();
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
      description="Complete this form to add a brand new Rick and Morty Character
    "
      className=" sm:max-w-screen-md"
    >
      <CharacterForm onSubmit={upsertCharacter} />
    </CustomDialog>
  );

  const EditFormDialog = (
    <CustomDialog
      open={editVisible}
      onOpenChange={editToggle}
      title="Edit character"
      description="Modify the fields for the selected character
    "
      className=" sm:max-w-screen-md"
    >
      <CharacterForm initialValues={selected} onSubmit={upsertCharacter} />
    </CustomDialog>
  );
  const StatusFormDialog = (
    <CustomDialog
      open={statusVisible}
      onOpenChange={statusToggle}
      title="Update status"
      description="Select if the character has died, resurrected, etc... 
    "
      className=" sm:max-w-screen-sm"
    >
      {selected && (
        <CharacterStatusForm initialValues={selected} onSubmit={updateStatus} />
      )}
    </CustomDialog>
  );
  return (
    <div>
      <PageHeader
        title="Characters"
        right={<CustomButton onClick={toggle}>Create Character</CustomButton>}
      />
      {FormDialog}
      {EditFormDialog}
      {StatusFormDialog}
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
          onEdit={(id) => {
            setSelected(findSelected(id));
            editToggle();
          }}
          onStatus={(id) => {
            setSelected(findSelected(id));
            statusToggle();
          }}
          data={data?.results || []}
          onFiltersChange={setFilters}
          stateFilters={filters}
          loading={loading}
          error={error}
        />
    </div>
  );
};
