import { EyeIcon } from "lucide-react";

import { Stats } from "./stats";
import { DashboardCard } from "./card";
import { Counter } from "./counter";
import { useMemo } from "react";

interface Props {
  values: number[];
}

export function DashboardViews({ values }: Props) {
  const totalViews = useMemo(() => values.reduce((a, b) => a + b, 0), [values]);
  return (
    <DashboardCard
      title={{
        text: "Number of views",
        right: (
          <div className="text-4xl">
            {" "}
            <Counter value={totalViews} />
          </div>
        ),
      }}
      description={{ text: "This week", Icon: EyeIcon }}
    >
      <Stats values={values} />
    </DashboardCard>
  );
}
