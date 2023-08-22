import { Filters } from "../ui/data-table-filters";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PencilIcon } from "lucide-react";

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
import { Episode } from "@/types/episode";

export interface UseColumnProps {
  onEdit: (id: number ) => any;
}

export const useColumns = ({ onEdit }: UseColumnProps) => {
  const columns: ColumnDef<Episode>[] = [
    {
      accessorKey: "episode",
      header: "Episode",
    },
    {
      accessorKey: "name",
      header: "Name",
    },

    { accessorKey: "air_date", header: "Air Date" },
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
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return { columns };
};

export const filterInputs: Filters<Episode>[] = [
  {
    type: "input",
    column: "name",
    label: "Name",
    placeholder: "Filter by episode name",
  },
  {
    type: "input",
    column: "episode",
    label: "Species",
    placeholder: "Filter by episode code",
  },
];
