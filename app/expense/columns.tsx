"use client";

import { Expense } from "../types/Expense";
import { Category } from "../types/Category";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

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
    accessorKey: "transactionDate",
    header: () => <div className="text-right">Fecha del gasto</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("transactionDate"));
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
