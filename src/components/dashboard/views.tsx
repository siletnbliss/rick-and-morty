import { ChevronRightIcon, EyeIcon, LucideIcon, MailIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Counter } from "./counter";
import { motion } from "framer-motion";
import { Stats } from "./stats";
import { DashboardCard } from "./card";

interface Props {
  values: number[];
}

export function DashboardViews({ values }: Props) {
  return (
    <DashboardCard
      title={{ text: "Number of views" }}
      description={{ text: "This week", Icon: EyeIcon }}
    >
      <Stats values={values} />
    </DashboardCard>
  );
}
