import { NextResponse } from "next/server";
import { users } from "@/server/mock-db";

export async function GET() {
  return NextResponse.json({ user: users[0] });
}
