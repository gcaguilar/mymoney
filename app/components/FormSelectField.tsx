import { FormItem, FormControl } from "@/app/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import React from "react";

type SelectFieldProps<T> = {
  field: {
    value: T;
    onChange: ((value: string) => void);
  };
  options: T[]
};

const FormSelectField = <T extends { id: string; name: string }>({
  field,
  options
}: SelectFieldProps<T>) => (
  <FormItem>
    <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value.id}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </FormItem>
);

export default FormSelectField;
