import { NextResponse } from "next/server";
import { Data, ExpenseDTOUpdate } from "../../models";
import ExpenseModel from "@/lib/db/models/ExpenseSchema";
import CategoryModel from "@/lib/db/models/CategorySchema";
import dbConnect from "@/lib/db/db";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
}

interface CategoryResult {
  id: string;
  name: string;
}


export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const expense = await ExpenseModel.findById({
      id: params.id,
    });

    if (!expense) {
      return NextResponse.json({ status: "No content" }, { status: 204 });
    }

    const category = await findCategoryByName(expense.category);

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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const json: Data<ExpenseDTOUpdate> = await req.json();
  const data = json.data;

  if (
    !params.id ||
    !data.name ||
    !data.amount ||
    !data.date ||
    !data.category
  ) {
    return NextResponse.json({ error: "Bad request" }, { status: 422 });
  }
  try {
    await ExpenseModel.findByIdAndUpdate(
      {
        id: params.id,
      },
      {
        name: data.name,
        amount: Number(data.amount),
        date: data.date,
        category: data.category,
      }
    );

    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function findCategoryByName(id: string): Promise<CategoryResult> {
  await dbConnect();
  const category = await CategoryModel.findById({
    id: id,
  });
  return { id: category._id, name: category.name };
}
