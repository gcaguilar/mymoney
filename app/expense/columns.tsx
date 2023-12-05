"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Category, Expense } from "../models";

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Dinero</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-right">Fecha del gasto</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = format(date, "dd/MM/yyyy");

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="text-right">Categoría</div>,
    cell: ({ row }) => {
      const category: Category = row.getValue("category");
      return <div className="text-right font-medium">{category.name}</div>;
    },
  },
];
