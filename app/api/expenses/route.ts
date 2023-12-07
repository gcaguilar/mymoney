import prisma from "@/lib/db/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import { Data, ExpenseDTO } from "../models";
import { Category, Expense } from "@/app/models";

export async function POST(req: Request, res: Response) {
  if (!req) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const json: Data<ExpenseDTO> = await req.json();
  const data = json.data;

  if (!data.title || !data.amount || !data.date || !data.category) {
    return NextResponse.json({ error: "Bad request" }, { status: 422 });
  }

  await prisma.expense.create({
    data: {
      name: data.title,
      amount: Number(data.amount),
      date: data.date,
      type: data.category,
    },
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
      type: data.category.id,
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