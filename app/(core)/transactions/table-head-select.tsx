import {
  SelectTrigger,
  SelectValue,
  Select,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FC } from "react";

type Props = {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};

const options = ["amount", "date", "payee"];

export const TableHeadSelect: FC<Props> = ({
  columnIndex,
  selectedColumns,
  onChange,
}) => {
  const currenctSelection = selectedColumns[`column_${columnIndex}`];
  return (
    <Select
      value={currenctSelection || ""}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          "focus:ring-offset-0 focus:ring-transparent outline-none",
          "border-none bg-transparent capitalize",
          currenctSelection && "text-sky-500"
        )}
      >
        <SelectValue placeholder="Ignorar" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">Ignorar</SelectItem>
        {options.map((option, index) => {
          const disabled =
            Object.values(selectedColumns).includes(option) &&
            selectedColumns[`column_${columnIndex}`] !== option;
          return (
            <SelectItem
              className="capitalize"
              key={index}
              value={option}
              disabled={disabled}
            >
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
