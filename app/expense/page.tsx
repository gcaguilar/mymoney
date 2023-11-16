"use server";

import { Expense } from "./model";
import { columns } from "./columns";
import { DataTable } from "@/app/components/data-table";
import React from "react";

export interface Data {
  data: Expense[];
}

async function fetchData(): Promise<Expense[]> {
  return fetch("http://localhost:3000/api/expenses", {
    method: "GET",
  })
    .then(async (res) => {
      const r = await res.json()
      console.log("Json", r);
      return r;
    })
    .then((jsonRes: Data) => {
      console.log("jsonRes", jsonRes.data)
      return jsonRes.data;
    });
}

async function ExpensePage() {
  const data = await fetchData();
  console.log("Data: ", data);
  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}

export default ExpensePage;
