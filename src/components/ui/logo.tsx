"use client";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";

interface Props extends Omit<ImageProps, "src" | "alt" | "height" | "width"> {
  size: number;
}
export const Logo = ({ size, ...props }: Props) => {
  return (
    <motion.div
      style={{
        height: size,
        width: size,
      }}
      whileHover={{ scaleX: -1 }}
      whileTap={{ scale: 1.5 }}
    >
      <Image {...props} height={size} width={size} alt="logo" src="/logo.png" />
    </motion.div>
  );
};
