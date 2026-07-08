import { NextResponse } from "next/server";
import { operationsService } from "@/server/services/operationsService";

export async function GET() {
  return NextResponse.json(operationsService.listCustomers());
}
