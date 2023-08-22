import { debounce } from "lodash";
import { ChangeEvent, useEffect, useMemo } from "react";
import { Input } from "./input";

export const DebouncedInput = ({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
}) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    [onChange, changeHandler]
  );
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);
  return <Input placeholder={placeholder} onChange={debouncedChangeHandler} />;
};
