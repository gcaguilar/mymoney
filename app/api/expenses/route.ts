import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { Category, Expense } from "@/app/models";
import { Prisma, PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  if (!req) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const json: { data: Expense | Expense[] } = await req.json();
  let expenses: Expense[] = Array.isArray(json.data) ? json.data : [json.data];

  if (
    !expenses.every(
      (expense) =>
        expense.name && expense.amount && expense.date && expense.category
    )
  ) {
    return NextResponse.json({ error: "Bad request" }, { status: 422 });
  }

  await prisma.expense.createMany({
    data: expenses.map(({ id, ...value }) => ({
      ...value,
      amount: BigInt(Math.floor(parseFloat(value.amount))),
      category: value.category.id,
    })),
  });

  return NextResponse.json({ status: 201 });
}

export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({});

    if (!expenses || expenses.length === 0) {
      return NextResponse.json({ status: "No content" }, { status: 204 });
    }

    const jsonExpense = await Promise.all(
      expenses.map(async (expense) => {
        const category = await findCategoryByName(expense.category);

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
      amount: Number(data.amount),
      date: data.date,
      category: data.category.id,
    },
  });

  return NextResponse.json({ status: 200 });
}

export async function DELETE(req: Request, res: Response) {
  if (!req) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const data = await req.json();
  console.log(data)
  if (!data.data.id) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  await prisma.expense.delete({
    where: {
      id: data.data.id,
    },
  });

  return NextResponse.json({ status: 200 });
}
