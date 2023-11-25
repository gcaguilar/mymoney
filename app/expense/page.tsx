"use client";

import { Expense } from "./model";
import { columns } from "./columns";
import { DataTable } from "@/app/components/data-table";
import React from "react";
import useSWR from "swr";
import { Data } from "../api/models";
import { fetcher } from "../fetcher";

function ExpensePage() {
  const { data, error, isLoading } = useSWR<Data<Expense[]>>(
    `api/expenses`,
    fetcher
  );

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
