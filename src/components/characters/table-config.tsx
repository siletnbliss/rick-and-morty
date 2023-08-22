import { Character, CharacterGender, CharacterStatus } from "@/types/character";
import { Filters } from "../ui/data-table-filters";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  HeartPulseIcon,
  HelpCircleIcon,
  MoreHorizontal,
  PencilIcon,
  SkullIcon,
} from "lucide-react";

import { CustomButton } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { CharacterDisplay } from "./Display";

export interface UseColumnProps {
  onEdit: (id: number | string) => any;
  onStatus: (id: number | string) => any;
}

export const useColumns = ({ onEdit, onStatus }: UseColumnProps) => {
  const columns: ColumnDef<Character>[] = [
    {
      accessorKey: "name",
      header: "Character",
      cell: ({ row }) => {
        return <CharacterDisplay character={row.original} />;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status: CharacterStatus = row.getValue("status");
        const Icon =
          status === "Alive"
            ? HeartPulseIcon
            : status === "Dead"
            ? SkullIcon
            : HelpCircleIcon;
        return (
          <div className="flex flex-col justify-start items-center w-fit">
            <Icon size={20} />
            <span className="">{status.slice(0, 5)}</span>
          </div>
        );
      },
    },
    { accessorKey: "species", header: "Species" },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => {
        const gender: CharacterGender = row.getValue("gender");
        return <div className="flex"> {gender}</div>;
      },
    },
    {
      accessorKey: "created",
      header: "Created",
      cell: ({ row }) => {
        const parsed = formatDate(row.getValue("created"));
        return <div>{parsed}</div>;
      },
    },
    {
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CustomButton size="icon" variant="ghost">
                <MoreHorizontal />
              </CustomButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Available Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => onEdit(id)}>
                  <PencilIcon className="mr-2" size={16} />
                  <span>Edit Character</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatus(id)}>
                  <SkullIcon className="mr-2" size={16} />
                  <span>Change Status</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return { columns };
};

export const CHARACTER_STATUSES = [
  {
    value: "Alive",
    label: "Alive",
  },
  {
    value: "Dead",
    label: "Dead",
  },
  {
    value: "Unknown",
    label: "Unknown",
  },
];

export const CHARACTER_GENDERS = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Genderless",
    label: "Genderless",
  },
  {
    value: "Unknown",
    label: "Unknown",
  },
];

export const filterInputs: Filters<Character>[] = [
  {
    type: "input",
    column: "name",
    label: "Name",
    placeholder: "Filter by character name",
  },
  {
    type: "input",
    column: "species",
    label: "Species",
    placeholder: "Filter by character species",
  },
  {
    type: "select",
    column: "status",
    label: "Status",
    placeholder: "Filter by status",
    options: CHARACTER_STATUSES,
  },
  {
    type: "select",
    column: "gender",
    label: "Gender",
    placeholder: "Filter by gender",
    options: CHARACTER_GENDERS,
  },
];
