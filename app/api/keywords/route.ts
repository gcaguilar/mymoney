import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.keywords.findMany({});

  if (!data) {
    return NextResponse.json({ error: "No content" }, { status: 204 });
  }

  return NextResponse.json({ data: data }, { status: 200 });
}

export async function POST(req: Request) {
  interface KeywordReq {
    keyword: [];
  }

  if (!req) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const json = await req.json();
  const data: KeywordReq = json.data;
  if (!data) {
    return NextResponse.json({ error: "Bad request" }, { status: 422 });
  }

  const keywordsToCreate = data.keyword.map((item) => ({
    name: item,
  }));

  await prisma.keywords.createMany({
    data: keywordsToCreate,
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

  const updated = await prisma.keywords.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
    },
  });

  if (updated) {
    return NextResponse.json({ status: 200 });
  } else {
    return NextResponse.json({ status: 204 });
  }
}
