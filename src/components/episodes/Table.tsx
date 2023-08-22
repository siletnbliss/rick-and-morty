"use-client";
import { DataTable, DataTableProps } from "../ui/data-table";

import { useColumns, filterInputs, UseColumnProps } from "./table-config";
import { Episode } from "@/types/episode";

type Props = Omit<
  DataTableProps<Episode, unknown>,
  "columns" | "filters" | "Data"
> &
  UseColumnProps;

export const EpisodesTable = ({
  data = [],
  pagination,
  onEdit,
  ...rest
}: Props) => {
  const { columns } = useColumns({ onEdit });
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
