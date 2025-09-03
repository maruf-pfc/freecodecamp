import { getAllPosts } from "@/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  try {
    const data = await getAllPosts();
    return NextResponse.json(
      { message: "Post fetched", data },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Post not available", err },
      { status: 400 }
    );
  }
}
