import nodemailer, { type SendMailOptions } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { SavedInquiry } from "./contact";

const OWNER_EMAIL = "info@allpurposeapps.com";
const INBOX_URL = "https://supabase.com/dashboard/project/vujrrskdxtskmkldvnkj/editor/17610?schema=public";
type Environment = Record<string, string | undefined>;
type MailTransport = {
  sendMail: (mail: SendMailOptions) => Promise<{ accepted?: unknown[] }>;
  close: () => void;
};
type TransportFactory = (options: SMTPTransport.Options) => MailTransport;

export function googleMailOptions(env: Environment): SMTPTransport.Options | null {
  // Google groups app passwords with spaces. Never accept the account's normal password.
  const password = env.GOOGLE_APP_PASSWORD?.replace(/\s/g, "");
  if (!password || !/^[a-z]{16}$/.test(password)) return null;
  return {
    host: "smtp.gmail.com", port: 465, secure: true,
    auth: { user: OWNER_EMAIL, pass: password },
    connectionTimeout: 5000, greetingTimeout: 5000, socketTimeout: 10000,
    tls: { minVersion: "TLSv1.2" },
    logger: false, debug: false,
    disableFileAccess: true, disableUrlAccess: true,
  };
}

export function inquiryEmail(inquiry: SavedInquiry): SendMailOptions {
  const received = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium", timeStyle: "long", timeZone: "America/New_York",
  }).format(new Date(inquiry.receivedAt));
  return {
    from: { name: "All-Purpose Apps", address: OWNER_EMAIL },
    to: OWNER_EMAIL,
    replyTo: { name: inquiry.name, address: inquiry.email },
    subject: `New website inquiry from ${inquiry.name}`,
    messageId: `<inquiry-${inquiry.id}@allpurposeapps.com>`,
    text: [
      "NEW WEBSITE INQUIRY", "",
      `From: ${inquiry.name} <${inquiry.email}>`,
      `Received: ${received}`,
      ...(inquiry.company ? [`Company: ${inquiry.company}`] : []),
      "", "MESSAGE", inquiry.message, "",
      "Press Reply to respond directly to the visitor.", "",
      `View your private inbox: ${INBOX_URL}`,
      `Inquiry reference: ${inquiry.id}`,
    ].join("\n"),
    disableFileAccess: true, disableUrlAccess: true,
  };
}

export async function sendInquiryAlert(
  inquiry: SavedInquiry,
  env: Environment,
  createTransport: TransportFactory = options => nodemailer.createTransport(options),
): Promise<void> {
  const options = googleMailOptions(env);
  if (!options) {
    console.error("contact_email_not_configured", { inquiryId: inquiry.id });
    return;
  }
  let transport: MailTransport | undefined;
  try {
    transport = createTransport(options);
    const result = await transport.sendMail(inquiryEmail(inquiry));
    if (!result.accepted?.some(address => typeof address === "string" && address.toLowerCase() === OWNER_EMAIL)) {
      throw new Error("Recipient not accepted");
    }
    // SMTP acceptance does not prove inbox delivery. Verify receipt during rollout.
    console.info("contact_email_accepted", { inquiryId: inquiry.id });
  } catch {
    // Never print SMTP errors: they can include credentials or message content.
    console.error("contact_email_failed", { inquiryId: inquiry.id });
  } finally {
    transport?.close();
  }
}
