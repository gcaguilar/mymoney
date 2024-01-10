import dbConnect from "@/lib/db/db";
import ExpenseModel from "@/lib/db/models/ExpenseSchema";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const sumByCategory = await ExpenseModel.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    {
      $unwind: "$categoryInfo",
    },
    {
      $group: {
        _id: "$categoryInfo.name",
        name: { $first: "$categoryInfo.name" },
        value: {
          $sum: "$amount",
        },
      },
    },
    {
      $project: {
        name: "$name",
        value: "$value",
        _id: 0,
      },
    },
  ]);

  const sumByMonth = await ExpenseModel.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    {
      $unwind: "$categoryInfo",
    },
    {
      $group: {
        _id: {
          date: {
            $dateToString: {
              format: "%Y-%m",
              date: {
                $dateFromString: {
                  dateString: "$date",
                },
              },
            },
          },
          expenses: {
            $arrayToObject: {
              $map: {
                input: {
                  $literal: [{ k: "$categoryInfo.name", v: "$amount" }],
                },
                in: "$$this",
              },
            },
          },
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$_id", "$_id.expenses"],
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  return NextResponse.json(
    { data: { sumByCategory, sumByMonth } },
    { status: 200 }
  );
}
