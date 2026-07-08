import { NextResponse } from "next/server";
import { operationsService } from "@/server/services/operationsService";

export async function GET() {
  return NextResponse.json(operationsService.listHands());
}

export async function POST() {
  return NextResponse.json(operationsService.createDraftHand(), { status: 201 });
}
