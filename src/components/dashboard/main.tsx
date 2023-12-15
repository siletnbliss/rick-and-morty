import React from "react";
import { PageHeader } from "../ui/page-header";
import DashboardGrid from "./grid";

export function DashboardMain() {
  return (
    <div>
      <PageHeader title="Dashboard" />
      <DashboardGrid />
    </div>
  );
}
