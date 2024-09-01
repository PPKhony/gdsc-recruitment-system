import { createHmac } from 'crypto';
import { createClient } from "@/utils/supabase/server";

// Secret key for webhook verification
const SECRET_KEY = process.env.WEBHOOK_SECRET_KEY;

export async function POST(req) {
  try {
    // Verify HMAC signature
    const receivedSignature = req.headers.get('x-cal-signature-256');
    if (!receivedSignature) {
      return new Response(JSON.stringify({ message: 'Missing signature' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const payload = await req.json();
    const hmac = createHmac('sha256', SECRET_KEY);
    hmac.update(JSON.stringify(payload));
    const computedSignature = hmac.digest('hex');

    if (computedSignature !== receivedSignature) {
      return new Response(JSON.stringify({ message: 'Invalid signature' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Process the webhook payload
    const supabase = createClient();
    
    if (payload.triggerEvent === "BOOKING_CREATED") {
      const start_time = new Date(payload.payload.startTime).toLocaleString(
        "en-US",
        {
          timeZone: "Asia/Bangkok",
        }
      );
      const end_time = new Date(payload.payload.endTime).toLocaleString(
        "en-US",
        {
          timeZone: "Asia/Bangkok",
        }
      );
      const response = payload.payload.responses;

      const application_id = response["applicationid"]?.value;
      const name = response["name"]?.value;
      const email = response["email"]?.value;
      const verifyCode = response["verifycode"]?.value;
      const rescheduleReason = response["rescheduleReason"]?.value;
      const meeting_link = payload.payload.metadata.videoCallUrl;
      const { error } = await supabase.from("interview_schedule").insert([
        {
          application_id: application_id,
          name: name,
          user_email: email,
          verifycode: verifyCode,
          reschedulereason: rescheduleReason,
          start_time: start_time,
          end_time: end_time,
          meeting_link: meeting_link
        },
      ]); // Specify the unique constraint

      if (error) {
        console.error(error);
        throw new Error("Failed to insert data into the database");
      }
    }

    // Respond to the webhook
    return new Response(
      JSON.stringify({ message: "Webhook received successfully" }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
