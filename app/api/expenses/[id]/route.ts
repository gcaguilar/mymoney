import prisma from "@/lib/db/prisma";
import { Category } from "@prisma/client";
import { NextResponse } from "next/server";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
}
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const expense = await prisma.expense.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!expense) {
      return NextResponse.json({ status: "No content" }, { status: 204 });
    }

    const category = await findCategoryByName(expense.type);

    const jsonExpense = {
      id: expense.id,
      name: expense.name,
      amount: Number(expense.amount),
      date: expense.date,
      category: {
        id: category.id,
        name: category.name,
      },
    };

    return NextResponse.json({ data: jsonExpense }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function findCategoryByName(id: string): Promise<Category> {
  const category = await prisma.category.findFirstOrThrow({
    where: {
      id: id,
    },
  });
  return category;
}
