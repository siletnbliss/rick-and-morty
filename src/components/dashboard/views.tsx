import { EyeIcon } from "lucide-react";

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
