import KeywordModel from "@/lib/db/models/KeywordsSchema";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await KeywordModel.find({});

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

  const keywordModels = data.keyword.map((keyword) => new KeywordModel({ name: keyword }));
  await KeywordModel.insertMany(keywordModels);

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

  const updatedKeyword = await KeywordModel.updateOne({
    _id: data.id,
  }, {
    name: data.name,
  });
  

  if (updatedKeyword) {
    return NextResponse.json({ status: 200 });
  } else {
    return NextResponse.json({ status: 204 });
  }
}
