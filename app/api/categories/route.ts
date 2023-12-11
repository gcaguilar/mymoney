import prisma from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.category.findMany({});

  if (!data) {
    return NextResponse.json({ error: "No content" }, { status: 204 });
  }

  const mappedData = data.map((category) => ({
    id: category.id,
    name: category.name,
    associatesNames: category.associatesNames
  }));

  return NextResponse.json({ data: mappedData }, { status: 200 });
}

export async function POST(req: Request) {
  if (!req) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const json = await req.json();
  const data = json.data

  if (!data) {
    return NextResponse.json({ error: "Bad request" }, { status: 422 });
  }

  await prisma.category.create({
    data: {
      name: data.name,
      associatesNames: data.associatesNames
    },
  });

  return NextResponse.json({ status: 200 });
}

export async function PUT(req: Request) {
  if (!req) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const data = await req.json();

  if (!data.name) {
    return NextResponse.json({ error: "Bad request" }, { status: 422 });
  }

  const updated = await prisma.category.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      associatesNames: data.associatesNames
    },
  });

  if (updated) {
    return NextResponse.json({ status: 200 });
  } else {
    return NextResponse.json({ status: 204 });
  }
}

export async function DELETE(req: Request) {
  if (!req) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const data = await req.json();

  if (!data.name) {
    return NextResponse.json({ error: "Bad request" }, { status: 422 });
  }

  const updated = await prisma.category.delete({
    where: {
      id: data.id,
    }
  });

  if (updated) {
    return NextResponse.json({ status: 200 });
  } else {
    return NextResponse.json({ status: 204 });
  }
}
