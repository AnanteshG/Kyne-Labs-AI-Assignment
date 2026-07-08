import { NextResponse } from "next/server";
import { operationsService } from "@/server/services/operationsService";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const approval = operationsService.resolveApproval(params.id);
  if (!approval) return NextResponse.json({ error: "Approval not found" }, { status: 404 });
  return NextResponse.json({ approval });
}
