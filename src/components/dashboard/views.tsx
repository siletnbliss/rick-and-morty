import { ChevronRightIcon, EyeIcon, LucideIcon, MailIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Counter } from "./counter";
import { motion } from "framer-motion";
import { Stats } from "./stats";

interface Props {
  values: number[];
}

export function DashboardViews({ values }: Props) {
  return (
    <motion.div
      className="h-full"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "100%", opacity: 1 }}
      transition={{ ease: "anticipate" }}
    >
      <Card className="p-10 flex flex-col py-15 justify-between h-full ">
        <div>
          <CardTitle>
            <div className="flex">Number of views</div>
          </CardTitle>
          <CardDescription className="flex items-center gap-1 text-lg">
            {" "}
            <EyeIcon size={20} />
            This week
          </CardDescription>
        </div>
        <CardContent className="p-0">
          <Stats values={values} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
