import { NextResponse } from "next/server";
import type { Role } from "@/domain/types";
import { operationsService } from "@/server/services/operationsService";

export async function POST(request: Request) {
  const body = (await request.json()) as { role?: Role };
  return NextResponse.json(operationsService.login(body.role));
}
