import { User } from "@/lib/models/User";
import clientPromise from "@/utils/mongodb";
import { NextRequest, NextResponse as res } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  if (!reqBody.email) {
    return res.json({
      error: {
        message: "Please enter an email address",
      },
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db("test");

    const res_user = await db
      .collection("users")
      .insertOne({ email: reqBody.email });
    console.log(res_user, res_user);

    return res.json({ res_user });
  } catch (error: any) {
    console.error(error);
    if (error.code === 11000) {
      return res.json({
        error: {
          message: "Email already exists",
        },
      });
    } else {
      console.error(`Error with MongoDB request: ${error.message}`);
      return res.json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
