import { FormItem, FormControl } from "@/app/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import React from "react";

type SelectFieldProps = {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
  options: {
    id: string;
    name: string;
  }[];
  placeholder: string;
};

const FormSelectField: React.FC<SelectFieldProps> = ({
  field,
  options,
  placeholder,
}) => (
  <FormItem>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
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
