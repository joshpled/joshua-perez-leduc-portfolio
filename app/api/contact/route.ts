import { after } from "next/server";
import { handleContact } from "@/lib/contact";
import { sendInquiryAlert } from "@/lib/contact-email";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  return handleContact(request, process.env, fetch, inquiry => {
    // Keep the function alive for SMTP without delaying the visitor's receipt.
    after(() => sendInquiryAlert(inquiry, process.env));
  });
}
