import prisma from "@/lib/db/prisma";
import { Category } from "@prisma/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
}

export async function POST(req: Request, res: Response) {
  if (!req) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const data: Expense = await req.json();

  if (!data.name || !data.amount || !data.date || !data.category) {
    return NextResponse.json({ error: "Bad request" }, { status: 422 });
  }

  await prisma.expense.create({
    data: {
      name: data.name,
      amount: data.amount,
      date: data.date,
      type: data.category,
    },
  });

  return NextResponse.json({ status: 201 });
}

export async function GET({ params }: { params: Params }) {
  try {
    let expenses;
    if (!params) {
      expenses = await prisma.expense.findMany({});
    } else {
      expenses = await prisma.expense.findMany({
        where: {
          id: params.id,
        },
      });
    }

    if (!expenses || expenses.length === 0) {
      return NextResponse.json({ status: "No content" }, { status: 204 });
    }

    const jsonExpense = await Promise.all(
      expenses.map(async (expense) => {
        const category = await findCategoryByName(expense.type);

        return {
          id: expense.id,
          name: expense.name,
          amount: Number(expense.amount),
          date: expense.date,
          category: {
            id: category.id,
            name: category.name,
          },
        };
      })
    );

    console.log("Response:", jsonExpense);

    return NextResponse.json({ data: jsonExpense }, { status: 200 });
  } catch (error) {
    console.error(error);
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

export async function PUT(req: Request, res: Response) {
  if (!req) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const data: Expense = await req.json();

  if (
    !data.id &&
    (!data.name || !data.amount || !data.date || !data.category)
  ) {
    return NextResponse.json({ error: "Bad request" }, { status: 422 });
  }

  await prisma.expense.update({
    where: {
      id: data.id,
    },

    data: {
      name: data.name,
      amount: data.amount,
      date: data.date,
      type: data.category,
    },
  });

  return NextResponse.json({ status: 200 });
}

export async function DELETE(req: Request, res: Response) {
  if (!req) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const data: Expense = await req.json();

  if (!data.id) {
    return NextResponse.json({ error: "Bad request" }, { status: 204 });
  }

  await prisma.expense.delete({
    where: {
      id: data.id,
    },
  });

  return NextResponse.json({ status: 200 });
}
