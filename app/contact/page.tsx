import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, contactConfigured } from "@/lib/contact";
import ContactForm from "./contact-form";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Contact | All-Purpose Apps",
  description: "Tell Joshua Perez Leduc about the website, app, or software you want to build.",
  alternates: { canonical: "https://allpurposeapps.com/contact" },
};

export default function ContactPage() {
  const enabled = contactConfigured(process.env);
  return (
    <main className="contact-page">
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="All-Purpose Apps home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="wordmark-logo" src="/brand/horizontal-primary.svg" alt="" />
        </Link>
        <Link className="text-link" href="/"><ArrowLeft aria-hidden="true" /> Back to the work</Link>
      </header>
      <div className="contact-layout">
        <section className="contact-intro" aria-labelledby="contact-title">
          <p className="section-label">Let’s build something</p>
          <h1 id="contact-title">Bring the idea.<br /><em>Start here.</em></h1>
          <p>Tell me what you want to build or improve. A rough sketch is plenty to start a conversation.</p>
          <div className="contact-person"><strong>Joshua Perez Leduc</strong><span>Your developer, from the first conversation.</span></div>
          <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}<ArrowUpRight aria-hidden="true" /></a>
        </section>
        <section className="contact-form-panel" aria-labelledby="form-heading">
          <h2 id="form-heading">Tell me about your project</h2>
          <p className="form-intro">Your message comes straight to my inbox.</p>
          {enabled ? <ContactForm siteKey={process.env.TURNSTILE_SITE_KEY!} contactEmail={CONTACT_EMAIL} /> :
            <p className="form-notice">The form is temporarily unavailable. <a href={`mailto:${CONTACT_EMAIL}`}>Email me directly</a> to start the conversation.</p>}
          <p className="contact-privacy">I use your details to respond to your inquiry. Messages are sent through Resend and kept in my email inbox; Cloudflare Turnstile checks for spam. Please leave out passwords, payment details, and sensitive documents.</p>
        </section>
      </div>
    </main>
  );
}
