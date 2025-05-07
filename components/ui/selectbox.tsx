"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectBoxProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

export function MonthSelectBox({
  value,
  onChange,
  placeholder = "MM",
}: SelectBoxProps) {
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  return (
    <div className="relative">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          side="bottom"
          avoidCollisions={false}
          className="z-[9999] bg-white"
        >
          {months.map((m) => (
            <SelectItem key={m} value={m} className="hover:bg-gray-100">
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function YearSelectBox({
  value,
  onChange,
  placeholder = "YY",
}: SelectBoxProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => String(currentYear + i));

  return (
    <div className="relative">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder}>
            {value ? value.slice(0, 2) : ""}
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          side="bottom"
          avoidCollisions={false}
          className="z-[9999] bg-white"
        >
          {years.map((year) => (
            <SelectItem
              key={year}
              value={year.slice(2)}
              className="hover:bg-gray-100"
            >
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
