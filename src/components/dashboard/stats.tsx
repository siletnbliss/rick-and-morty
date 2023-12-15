"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

interface Props {
  values: number[];
}
const ANIMATION_OFFSET = 12;
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
export function Stats({ values }: Props) {
  const maxValue = useMemo(() => Math.max(...values), [values]);

  return (
    <div className="border-b-2 flex justify-evenly h-full gap-2">
      <AnimatePresence>
        {values.map((v, i) => {
          return (
            <div key={i} className="h-full relative">
              <div className="h-full flex flex-col justify-end  items-center">
                <motion.svg
                  width="100%"
                  className="mt-auto block "
                  style={{ maxWidth: 50 }}
                  height={`${Math.round((v * 100) / maxValue)}%`}
                  key={`svg-${i}`}
                >
                  <motion.rect
                    className="flex-1 w-full mt-auto"
                    width="100%"
                    fill="	limegreen"
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{
                      duration: 1,
                      ease: "backOut",
                      delay: i / ANIMATION_OFFSET,
                    }}
                    key={`rect-${i}`}
                  />
                </motion.svg>
              </div>
              <div className="absolute -bottom-8 text-muted-foreground text-center w-full">
                {" "}
                {DAYS[i]}
              </div>
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
