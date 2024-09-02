// app/api/submit-application/route.js

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const supabase = createClient();
  const body = await req.json(); // Read the request body
  body.issubmit = true; // Add issubmit key and set it to true

  const { data, error } = await supabase
    .from("applicants")
    .upsert(body, { onConflict: ["user_id"] });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    // Extract the origin from the request URL
    const origin = new URL(req.url).origin;
    // Construct the full redirect URL
    const redirectUrl = `${origin}/home/success`;

    // Return the redirect URL as JSON
    return NextResponse.json({ redirectUrl }, { status: 200 });
  }
}

export async function GET() {
  return NextResponse.json(
    { error: `Method GET Not Allowed` },
    { status: 405, headers: { Allow: "POST" } }
  );
}
