"use client"

import { ComponentProps, useState } from "react";

export interface OptionProps {
  name: string;
  value: string;
}

type SelectOptionProps = {
  className?: string;
  options: OptionProps[];
  name: string;
  propSelectedOption: string
} & ComponentProps<"select">;

export default function SelectOption({
  className,
  options,
  name,
  propSelectedOption,
  ...props
}: SelectOptionProps) {
  const [selectedOption, setSelectedOption] = useState<string>(propSelectedOption ? "" : propSelectedOption );

  const Option = ({
    value,
    name,
  }: OptionProps) => (
    <option key={value} value={name}>
      {name}
    </option>
  );

  return (
    <>
      <select
        key="select-element"
        name={name}
        className={className}
        value={selectedOption}
        onChange={(e) => {
          setSelectedOption(e.target.value);
        }}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value} name={option.name} />
        ))}
      </select>
    </>
  );
}
