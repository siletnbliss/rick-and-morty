"use-client";
import { Character } from "@/types/character";
import { DataTable, DataTableProps } from "../ui/data-table";

import { columns, filterInputs } from "./table-config";

interface Props
  extends Omit<
    DataTableProps<Character, unknown>,
    "columns" | "filters" | "Data"
  > {}

export const CharactersTable = ({ data = [], pagination, ...rest }: Props) => {
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
