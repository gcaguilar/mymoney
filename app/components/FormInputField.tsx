import {
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import React from "react";

type InputFieldProps = {
  title?: string;
  field: {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  placeholder: string;
  type: string;
  onFieldChange?: (value: string) => void;
};

const FormInputField: React.FC<InputFieldProps> = ({
  title,
  field,
  placeholder,
  type,
  onFieldChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);

    if (onFieldChange) {
      onFieldChange(e.target.value);
    }
  };

  return (
    <FormItem>
      {title ? <FormLabel>{title}</FormLabel> : null}
      <FormControl>
        <Input
          type={type}
          placeholder={placeholder}
          value={field.value}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormInputField;
