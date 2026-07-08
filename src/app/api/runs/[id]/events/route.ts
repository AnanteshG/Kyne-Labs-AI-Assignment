import { NextResponse } from "next/server";
import { operationsService } from "@/server/services/operationsService";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json(operationsService.getRunEvents(params.id));
}
