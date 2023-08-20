import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
}
export const Drawer = ({
  children,
  setIsOpen,
  isOpen,
  title,
  className,
}: Props) => {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 -translate-x-full  ")
      }
    >
      <section
        className={cn(
          ` w-screen  left-0 absolute bg-card h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ` +
            (isOpen ? " translate-x-0 " : "-translate-x-full"),
          className
        )}
      >
        <article className="relative  pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="h-20 items-center px-8 font-bold text-lg flex justify-between">
            <span>{title}</span> <XIcon onClick={() => setIsOpen(false)} />
          </header>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
};
