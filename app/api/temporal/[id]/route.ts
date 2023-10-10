import prisma from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { useRouter } from "next/router";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const paramId = params.id;

  console.log(params)

  if (!paramId) {
    return NextResponse.json(
      { error: 'El parámetro "id" es requerido' },
      { status: 400 }
    );
  }

  const expense = await prisma.temporalExpenses
    .findFirst({
      where: {
        id: paramId.toString(),
      },
    })
    .catch((error) => console.log(error))
    .then((data) => data?.expenseList);

  if (expense) {
    return NextResponse.json({ expense }, { status: 200 });
  } else {
    return NextResponse.json({ status: 500 });
  }
}
