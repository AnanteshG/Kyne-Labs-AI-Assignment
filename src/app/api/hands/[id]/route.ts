import { NextResponse } from "next/server";
import { operationsService } from "@/server/services/operationsService";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const result = operationsService.getHand(params.id);
  if (!result) return NextResponse.json({ error: "Hand not found" }, { status: 404 });
  return NextResponse.json(result);
}
