import { config } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

// Allow 5 submissions per IP per day (86400 seconds = 24 hours)
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 86400,
});

export async function POST(request: NextRequest) {
  // Rate-limit by IP address
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0].trim() ?? "unknown";

  try {
    await rateLimiter.consume(ip);
  } catch {
    return NextResponse.json(
      { error: "Too many submissions. Please try again tomorrow." },
      { status: 429 },
    );
  }

  // Validate request body
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  // Build FormData with Google Form entry IDs
  const formData = new FormData();
  formData.append(config.contact.formNameId!, name.trim());
  formData.append(config.contact.formEmailId!, email.trim());
  formData.append(config.contact.formMessageId!, message.trim());

  const googleFormUrl = config.contact.formURL;
  if (!googleFormUrl) {
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 },
    );
  }

  try {
    await fetch(googleFormUrl, {
      method: "POST",
      body: formData,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to submit your message. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
