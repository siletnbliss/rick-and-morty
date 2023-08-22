"use-client";
import { Table } from "@tanstack/react-table";
import { CustomSelect } from "./select";
import { useEffect, useState } from "react";
import { FilterIcon, XIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CustomButton } from "./button";

import { DebouncedInput } from "./debounced-input";

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

export const DataTableFilters = <TData,>({
  table,
  filters,
}: DataTableFilterProps<TData>) => {
  const [inputValues, setInputValues] = useState<{ id: any; value: string }[]>(
    []
  );

  useEffect(() => {
    if (filters) {
      setInputValues(
        filters.map((filter) => ({
          id: filter.column,
          value: "",
        }))
      );
    }
  }, [filters]);

  const updateInputValues = (update: { id: any; value: string }) => {
    setInputValues((values) =>
      values.map((v) => {
        if (v.id === update.id) {
          return { ...v, value: update.value };
        }
        return v;
      })
    );
  };

  const FilterList = (
    <div className="flex w-full md:flex-row flex-col space-x-3 items-end space-y-5">
      {inputValues.map((inputVal, idx) => {
        const filter = filters[idx];
        const column = table.getColumn(filter.column as string);
        const value = column?.getFilterValue() as string;
        const onValueChange = (val: string) => column?.setFilterValue(val);
        return (
          <div className="max-w-full w-full" key={idx}>
            <div className="flex w-full justify-between">
              <div className="flex text-muted-foreground space-x-2 mb-1">
                {" "}
                <FilterIcon size={16} />{" "}
                <span className="text-xs ">{filter.label}</span>
              </div>
              {value && value.length > 0 && filter.type === "select" && (
                <span
                  onClick={() => {
                    onValueChange("");
                    updateInputValues({ id: filter.column, value: "" });
                  }}
                  className="flex cursor-pointer justify-end text-end text-xs"
                >
                  {" "}
                  Clear <XIcon size={14} />
                </span>
              )}
            </div>
            {filter.type === "input" ? (
              <DebouncedInput
                value={inputVal.value}
                placeholder={filter.placeholder}
                onChange={(value) => {
                  onValueChange(value);
                  updateInputValues({ id: filter.column, value: value });
                }}
              />
            ) : (
              <CustomSelect
                onValueChange={(value) => {
                  onValueChange(value);
                  updateInputValues({ id: filter.column, value: value });
                }}
                value={inputVal.value}
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
        <PopoverContent className="bg-background w-80  max-w-screen p-3 z-50 border rounded-b-md border-t-0">
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
