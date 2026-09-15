import { createHash } from "node:crypto";
import { z } from "zod";

export const CONTACT_EMAIL = "info@allpurposeapps.com";
type Environment = Record<string, string | undefined>;
const singleLine = z.string().trim().min(1).max(120).regex(/^[^\r\n\u0000-\u001f]+$/);
const schema = z.object({
  name: singleLine,
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(120).regex(/^[^\r\n\u0000-\u001f]*$/).default(""),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(200).default(""),
  token: z.string().min(1).max(2048),
  submissionId: z.string().uuid(),
}).strict();

export function contactConfigured(env: Environment) {
  return Boolean(env.RESEND_API_KEY && env.TURNSTILE_SECRET_KEY && env.TURNSTILE_SITE_KEY &&
    z.string().email().safeParse(env.CONTACT_FROM_EMAIL).success);
}

function reply(status: number, message: string) {
  return Response.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}

// Dependency injection lets tests prove delivery decisions without sending real mail.
export async function handleContact(request: Request, env: Environment, send: typeof fetch = fetch) {
  const origins = new Set(["https://allpurposeapps.com", "https://www.allpurposeapps.com",
    ...(env.CONTACT_ALLOWED_ORIGINS ?? "").split(",").map(value => value.trim()).filter(Boolean)]);
  const origin = request.headers.get("origin");
  if (!origin || !origins.has(origin)) return reply(403, "Please send your message from the contact page.");
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return reply(415, "Please send your message from the contact page.");
  }
  // Bound bytes while reading, including requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return reply(400, "Please complete the form.");
  let bytes = 0;
  let raw = "";
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 32_768) {
        await reader.cancel();
        return reply(413, "Your message is too long. Please keep it under 5,000 characters.");
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return reply(400, "We couldn’t read your message. Please try again.");
  }
  let input;
  try { input = schema.safeParse(JSON.parse(raw)); } catch { return reply(400, "Please complete the form."); }
  if (!input.success) return reply(400, "Check your name, email, and message (10–5,000 characters), then try again.");
  const data = input.data;
  if (data.website) return reply(400, "We couldn’t verify this submission. Please email me instead.");
  if (!contactConfigured(env)) return reply(503, "The form is temporarily unavailable. Please email me directly.");

  try {
    const verification = await send("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: data.token }),
      signal: AbortSignal.timeout(8000),
    });
    if (!verification.ok) return reply(503, "Verification is unavailable. Please try again or email me directly.");
    const challenge = await verification.json();
    if (challenge.success !== true || challenge.action !== "contact" || challenge.hostname !== new URL(origin).hostname) {
      return reply(400, "Please complete the spam check again, then resend your message.");
    }

    const email = {
      from: `All-Purpose Apps website <${env.CONTACT_FROM_EMAIL}>`,
      to: [CONTACT_EMAIL],
      reply_to: data.email,
      subject: `Website inquiry from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "Not provided"}\n\n${data.message}`,
    };
    // Same submission + unchanged email can be retried without duplicate mail for 24h.
    // Hash the content so edited messages cannot collide with an earlier attempt.
    const digest = createHash("sha256").update(JSON.stringify(email)).digest("hex");
    const delivery = await send("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json",
        "Idempotency-Key": `contact/${data.submissionId}/${digest}` },
      body: JSON.stringify(email),
      signal: AbortSignal.timeout(12000),
    });
    if (!delivery.ok || typeof (await delivery.json()).id !== "string") {
      return reply(502, "We couldn’t confirm sending. Your message is still here—please retry or email me directly.");
    }
    return reply(200, "Your message is on its way. Thanks for getting in touch.");
  } catch {
    // Provider errors may contain personal data or credentials: never log their payloads.
    return reply(502, "We couldn’t confirm sending. Your message is still here—please retry or email me directly.");
  }
}
