"use client";
import { motion } from "framer-motion";
import { useCallback, useMemo } from "react";

interface Props {
  values: number[];
}
// TODO: complete this
export function Stats({ values }: Props) {
  const maxValue = useMemo(() => Math.max(...values), [values]);
  return (
    <div className="border-b-2 flex h-full">
      {values.map((v, i) => {
        return (
          <motion.rect
            key={i}
            className="flex-1"
            fill="green"
            height={`${Math.round((v * 100) / maxValue)}%`}
          />
        );
      })}
    </div>
  );
}
