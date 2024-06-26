import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChartIcon,
  BarChartIcon,
  FileSearchIcon,
  LineChartIcon,
  Loader2Icon,
} from "lucide-react";
import { AreaVariant } from "@/components/area-variant";
import { BarVariant } from "@/components/bar-variant";
import { LineVariant } from "@/components/line-variant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "./ui/skeleton";

type Props = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const Chart: FC<Props> = ({ data = [] }) => {
  const [chartType, setChartType] = useState("area");

  const onTypeChange = (type: string) => {
    setChartType(type);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transações</CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Gráficos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center">
                <AreaChartIcon className="size-4 mr-2 shrink-0" />
                Area
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center">
                <BarChartIcon className="size-4 mr-2 shrink-0" />
                Barra
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center">
                <LineChartIcon className="size-4 mr-2 shrink-0" />
                Linha
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearchIcon className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              Não há dados suficientes para exibir um gráfico. Tente adicionar.
            </p>
          </div>
        ) : (
          <>
            {chartType === "area" && <AreaVariant data={data} />}
            {chartType === "bar" && <BarVariant data={data} />}
            {chartType === "line" && <LineVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const ChartLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 lg:w=[120px] w-full" />
      </CardHeader>
      <CardContent>
        <div className="w-full h-[350px] flex items-center justify-center">
          <Loader2Icon className="size-12 text-muted-foreground animate-spin" />
        </div>
      </CardContent>
    </Card>
  );
};
