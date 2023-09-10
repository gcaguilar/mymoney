"use client";

import dayjs from "dayjs";
import { ComponentProps, useState } from "react";

type DateInputProps = {
  className?: string;
  name: string;
} & ComponentProps<"input">;

export default function DateInput({
  name,
  className,
  ...props
}: DateInputProps) {
  const now = dayjs().format("YYYY-MM-DD");
  const [date, setDate] = useState<Date>(new Date(now));

  return (
    <>
      <input
        name={name}
        type="date"
        required
        className={className}
        defaultValue={dayjs(date).format("YYYY-MM-DD")}
        onChange={(e) => setDate(new Date(e.target.value))}
        max={now}
      />
    </>
  );
}
