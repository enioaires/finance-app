import { FC } from "react";
import { LucideIcon } from "lucide-react";
import { VariantProps, cva } from "class-variance-authority";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CountUp } from "./count-up";
import { cn, formatCurrency, formatPercentageChange } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

const boxVariant = cva("rounded-md p-3 shrink-0", {
  variants: {
    variant: {
      default: "bg-sky-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

const iconVariant = cva("size-6", {
  variants: {
    variant: {
      default: "fill-sky-500 stroke-sky-700",
      success: "fill-emerald-500 stroke-emerald-700",
      danger: "fill-rose-500 stroke-rose-700",
      warning: "fill-yellow-500 stroke-yellow-700",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

type BoxVariants = VariantProps<typeof boxVariant>;
type IconVariants = VariantProps<typeof iconVariant>;

interface Props extends BoxVariants, IconVariants {
  title: string;
  value?: number;
  percetageChange?: number;
  icon: LucideIcon;
  dateRange: string;
}

export const DataCard: FC<Props> = ({
  title,
  value,
  percetageChange,
  icon: Icon,
  variant,
  dateRange,
}) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {dateRange}
          </CardDescription>
        </div>
        <div className={boxVariant({ variant })}>
          <Icon className={iconVariant({ variant })} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
          <CountUp
            preserveValue
            end={value ?? 0}
            start={0}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatCurrency}
          />
        </h1>
        <p
          className={cn(
            "text-muted-foreground text-sm line-clamp-1",
            percetageChange! > 0 && "text-emerald-500",
            percetageChange! < 0 && "text-rose-500"
          )}
        >
          {formatPercentageChange(percetageChange ?? 0, { addPrefix: true })}
        </p>
      </CardContent>
    </Card>
  );
};

export const DataCardSkeleton: FC = () => {
  return (
    <Card className="border-none drop-shadow-sm h-[192px]">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-40 h-4" />
        </div>
        <Skeleton className="size-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-24 h-10 mb-2 shrink-0" />
        <Skeleton className="w-40 h-4 shrink-0" />
      </CardContent>
    </Card>
  );
};
