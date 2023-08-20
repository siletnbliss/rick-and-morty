import Image, { ImageProps } from "next/image";

interface Props extends Omit<ImageProps, "src" | "alt" | "height" | "width"> {
  size: number;
}
export const Logo = ({ size, ...props }: Props) => {
  return (
    <Image {...props} height={size} width={size} alt="logo" src="/logo.png" />
  );
};
