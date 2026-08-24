import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    await connectDB();
    logger.info({ endpoint: "/api/health", status: "ok" }, "Health check passed");
    return NextResponse.json({ status: "ok", db: "connected" });
  } catch (error) {
    logger.error(
      { endpoint: "/api/health", error: String(error) },
      "Health check failed"
    );
    return NextResponse.json(
      { status: "error", db: "disconnected", error: String(error) },
      { status: 503 }
    );
  }
}
