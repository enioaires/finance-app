import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import { FC } from "react";

const DashboardPage: FC = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
      <DataCharts />
    </div>
  );
};

export default DashboardPage;
