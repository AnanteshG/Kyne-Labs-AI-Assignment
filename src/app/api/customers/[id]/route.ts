import { NextResponse } from "next/server";
import { operationsService } from "@/server/services/operationsService";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const customer = operationsService.getCustomer(params.id);
  if (!customer) return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  return NextResponse.json({ customer });
}
