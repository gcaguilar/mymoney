"use client";

import { columns } from "./columns";
import { DataTable } from "@/app/components/data-table";
import React from "react";
import { useExpenses } from "../hooks";

function ExpensePage() {
  const { data, error, isLoading } = useExpenses();

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <>
      <DataTable columns={columns} data={data.data} />
    </>
  );
}

export default ExpensePage;
