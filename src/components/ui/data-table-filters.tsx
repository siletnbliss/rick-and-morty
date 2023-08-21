"use-client";
import { Table } from "@tanstack/react-table";
import { Input } from "./input";
import { CustomSelect } from "./select";
import { useState } from "react";
import { FilterIcon, XIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CustomButton } from "./button";

interface BaseFilter<TData> {
  type: "input" | "select";
  placeholder: string;
  label: string;
  column: keyof TData;
}

interface InputFilter<T> extends BaseFilter<T> {
  type: "input";
}

interface SelectFilter<T> extends BaseFilter<T> {
  type: "select";
  options: {
    value: string;
    label: string;
  }[];
}

export type Filters<TData> = InputFilter<TData> | SelectFilter<TData>;

export interface DataTableFilterProps<TData> {
  table: Table<TData>;
  filters: Filters<TData>[];
}

const InputFilter = ({
  id,
  placeholder,
  onChange,
  initialValue,
}: {
  id: string;
  initialValue: string;
  placeholder: string;
  onChange: (value: string) => void;
}) => {
  const [value, setValue] = useState(initialValue || "");
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onKeyUp={(event) => {
        if (event.key === "Enter") {
          onChange(value);
        }
      }}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export const DataTableFilters = <TData,>({
  table,
  filters,
}: DataTableFilterProps<TData>) => {
  const FilterList = (
    <div className="flex w-full md:flex-row flex-col space-x-3 items-end space-y-5">
      {filters.map((filter, idx) => {
        const value = table
          .getColumn(filter.column as string)
          ?.getFilterValue() as string;
        const onValueChange = (value: string) =>
          table.getColumn(filter.column as string)?.setFilterValue(value);
        return (
          <div className="max-w-full w-full" key={idx}>
            <div className="flex w-full justify-between">
              <div className="flex text-muted-foreground space-x-2 mb-1">
                {" "}
                <FilterIcon size={16} />{" "}
                <span className="text-xs ">{filter.label}</span>
              </div>
              {value && value.length && (
                <span
                  onClick={() => onValueChange("")}
                  className="flex cursor-pointer justify-end text-end text-xs"
                >
                  {" "}
                  Clear <XIcon size={14} />
                </span>
              )}
            </div>
            {filter.type === "input" ? (
              <InputFilter
                initialValue={value}
                id={filter.column as string}
                placeholder={filter.placeholder}
                onChange={onValueChange}
              />
            ) : (
              <CustomSelect
                onValueChange={onValueChange}
                value={value}
                options={filter.options}
              />
            )}
          </div>
        );
      })}
    </div>
  );
  const ResponsiveFilter = (
    <div className="md:hidden flex justify-center">
      <Popover>
        <PopoverTrigger className="w-full" asChild>
          <CustomButton
            className="max-w-full w-80"
            variant="outline"
            Icon={FilterIcon}
          >
            {" "}
            Filters
          </CustomButton>
        </PopoverTrigger>
        <PopoverContent className="bg-background w-80  max-w-screen p-3 z-50">
          {FilterList}
        </PopoverContent>
      </Popover>
    </div>
  );
  return (
    <div>
      <div className="hidden md:inline">{FilterList}</div>
      {ResponsiveFilter}
    </div>
  );
};
