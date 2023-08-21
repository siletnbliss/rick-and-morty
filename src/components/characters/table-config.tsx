import { Character, CharacterGender, CharacterStatus } from "@/types/character";
import { Filters } from "../ui/data-table-filters";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { HeartPulseIcon, HelpCircleIcon, SkullIcon } from "lucide-react";

export const columns: ColumnDef<Character>[] = [
  {
    accessorKey: "name",
    header: "Character",
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      const img: string = row.original.image;
      const type = row.original.type;
      return (
        <div className="flex space-x-2 items-center">
          <Image
            height={45}
            width={45}
            src={img}
            alt={"logo-" + name}
            style={{ borderRadius: "50%" }}
            className=" object-cover"
          />
          <span>
            {name} <br />
            <span className="text-xs text-gray-400">{type}</span>
          </span>
        </div>
      );
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
    options: [
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
    ],
  },
  {
    type: "select",
    column: "gender",
    label: "Gender",
    placeholder: "Filter by gender",
    options: [
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
    ],
  },
];
