"use client";
import { useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";

export function Counter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      damping: 100,
      stiffness: 100,
      duration: 2,
      ease: "linear",
    });

    return controls.stop;
  }, []);

  return <motion.div>{rounded}</motion.div>;
}
