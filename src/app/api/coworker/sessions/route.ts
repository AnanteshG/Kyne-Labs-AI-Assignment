import { NextResponse } from "next/server";
import { operationsService } from "@/server/services/operationsService";

export async function POST() {
  return NextResponse.json(operationsService.generateCoworkerSession());
}
