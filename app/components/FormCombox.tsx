import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react";
import React from "react";
import { Category } from "../models";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { ScrollArea } from "@/app/components/ui/scroll-area";

type ComboboxProps = {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
  onFieldChange?: (id: string, value: string) => void;
  options: Category[];
};

const FormComboBox: React.FC<ComboboxProps> = ({
  field,
  onFieldChange,
  options,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    field.onChange(value);

    const selectedOption = options.find((option) => option.id === value);

    if (selectedOption) {
      setOpen(false);
      if (onFieldChange) {
        onFieldChange(value, selectedOption.name);
      }
    }
  };

  return (
    <FormItem className="flex flex-col">
      <FormLabel>Categoría</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-[200px] justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value
                ? options.find((option) => option.id === field.value)?.name
                : "Select language"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <ScrollArea className="h-48 overflow-auto">
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    value={option.id}
                    key={option.id}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        option.id === field.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export default FormComboBox;
