import prisma from "@/lib/db/prisma";
import { RequestParams } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { error: 'El parámetro "id" es requerido' },
      { status: 400 }
    );
  }

  const expense = await prisma.temporalExpenses
    .findFirst({
      where: {
        id: id.toString(),
      },
    })
    .then((data) => data?.expenseList);

  if (!expense) {
    return NextResponse.json({ status: 500 });
  } else {
    return NextResponse.json({ expense }, { status: 200 });
  }
}
