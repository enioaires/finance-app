"use client";
import { FC } from "react";
import { useSearchParams } from "next/navigation";
import { formatDateRange } from "@/lib/utils";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { DataCard, DataCardSkeleton } from "./data-card";

export const DataGrid: FC = () => {
  const { data, isLoading } = useGetSummary();
  const params = useSearchParams();
  const to = params.get("to") ?? undefined;
  const from = params.get("from") ?? undefined;

  const daterangeLabel = formatDateRange({ from, to });

  if (isLoading)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardSkeleton />
        <DataCardSkeleton />
        <DataCardSkeleton />
      </div>
    );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Restante"
        value={data?.remainingAmount}
        percetageChange={data?.remainingChange}
        icon={PiggyBankIcon}
        variant="default"
        dateRange={daterangeLabel}
      />
      <DataCard
        title="Renda"
        value={data?.incomeAmount}
        percetageChange={data?.incomeChange}
        icon={TrendingUpIcon}
        variant="success"
        dateRange={daterangeLabel}
      />
      <DataCard
        title="Despesa"
        value={data?.expensesAmount}
        percetageChange={data?.expensesChange}
        icon={TrendingDownIcon}
        variant="danger"
        dateRange={daterangeLabel}
      />
    </div>
  );
};
