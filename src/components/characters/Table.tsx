"use-client";
import { Character } from "@/types/character";
import { DataTable, DataTableProps } from "../ui/data-table";

import { useColumns, filterInputs, UseColumnProps } from "./table-config";

type Props = Omit<
  DataTableProps<Character, unknown>,
  "columns" | "filters" | "Data"
> &
  UseColumnProps;

export const CharactersTable = ({
  data = [],
  pagination,
  onEdit,
  onStatus,
  ...rest
}: Props) => {
  const { columns } = useColumns({ onEdit, onStatus });
  return (
    <div className="">
      <DataTable
        filters={filterInputs}
        pagination={pagination}
        columns={columns}
        data={data}
        {...rest}
      />
    </div>
  );
};
