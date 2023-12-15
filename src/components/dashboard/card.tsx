import { ChevronRightIcon, LucideIcon, MailIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Counter } from "./counter";
import { motion } from "framer-motion";
import { PropsWithChildren, ReactNode, useMemo } from "react";
import Link from "next/link";

interface Props {
  title: { text: string; right?: ReactNode };
  description: { text: string; Icon?: LucideIcon };
  animation?: "right" | "top";
}

export function DashboardCard({
  title,
  description,
  children,
  animation = "right",
}: PropsWithChildren<Props>) {
  const animationProps = useMemo(() => {
    switch (animation) {
      case "top":
        return {
          initial: { height: 0, opacity: 0 },
          animate: { height: "100%", opacity: 1 },
        };
      default:
        return {
          initial: { width: 0, opacity: 0 },
          animate: { width: "100%", opacity: 1 },
        };
    }
  }, [animation]);
  return (
    <motion.aside className="h-full" {...animationProps}>
      <Card className="p-10 flex flex-col py-15 justify-between h-full ">
        <div>
          <CardTitle className="flex justify-between items-center">
            <span>{title.text}</span>
            {title.right}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 text-lg">
            {" "}
            {!!description.Icon && <description.Icon size={20} />}
            {description.text}
          </CardDescription>
        </div>
        <CardContent className="p-0">{children}</CardContent>
      </Card>
    </motion.aside>
  );
}
interface CounterProps extends Props {
  link: string;
  count: number;
}
export function CardCounter({ link, count, title, ...rest }: CounterProps) {
  return (
    <Link href={link}>
      <DashboardCard
        title={{ text: title.text, right: <ChevronRightIcon /> }}
        {...rest}
      >
        <div className="text-3xl  text-right ">
          <Counter value={count} />

          <ChevronRightIcon className="hidden" size={24} />
        </div>
      </DashboardCard>
    </Link>
  );
}
