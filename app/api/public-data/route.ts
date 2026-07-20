import { NextResponse } from "next/server";
import { buildPublicPayload } from "@/lib/emergency/dashboard";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = buildPublicPayload();

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
