import { ChevronRightIcon, LucideIcon, MailIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Counter } from "./counter";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  count: number;
  Icon: LucideIcon;
  link: string;
}

export function DashboardCard({
  title,
  count,
  description,
  Icon,
  link,
}: Props) {
  return (
    <motion.aside
      className="h-full"
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
    >
      <Link href={link}>
        <Card className="p-10 flex flex-col py-15 justify-between h-full ">
          <div>
            <CardTitle className="flex justify-between">
              <span>{title}</span>
              <ChevronRightIcon />
            </CardTitle>
            <CardDescription className="flex items-center gap-1 text-lg">
              {" "}
              <Icon size={20} />
              {description}
            </CardDescription>
          </div>
          <CardContent className="p-0">
            <div className="text-3xl  text-right ">
              <Counter value={count} />

              <ChevronRightIcon className="hidden" size={24} />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.aside>
  );
}
