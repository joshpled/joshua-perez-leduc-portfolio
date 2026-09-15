"use client";

import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

type Turnstile = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: Turnstile } }

export default function ContactForm({ siteKey, contactEmail }: { siteKey: string; contactEmail: string }) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const submissionId = useRef("");
  const inFlight = useRef(false);
  const feedback = useRef<HTMLParagraphElement>(null);
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [verificationError, setVerificationError] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(() => () => {
    if (widget.current !== null) window.turnstile?.remove(widget.current);
    widget.current = null;
  }, []);
  useEffect(() => { if (message) feedback.current?.focus(); }, [message]);

  function renderChallenge() {
    if (!container.current || !window.turnstile || widget.current !== null) return;
    widget.current = window.turnstile.render(container.current, {
      sitekey: siteKey, action: "contact", theme: "light", size: "compact",
      callback: (value: string) => { setToken(value); setVerificationError(false); },
      "expired-callback": () => setToken(""),
      "error-callback": () => { setToken(""); setVerificationError(true); },
      "timeout-callback": () => { setToken(""); setVerificationError(true); },
    });
    setWidgetReady(true);
  }

  function resetChallenge() {
    setToken("");
    if (widget.current !== null && window.turnstile) {
      setVerificationError(false);
      window.turnstile.reset(widget.current);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || sent || !token) return;
    const values = new FormData(event.currentTarget);
    inFlight.current = true;
    setBusy(true);
    setMessage("");
    submissionId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.get("name"), email: values.get("email"),
          company: values.get("company"), message: values.get("message"), website: values.get("website"),
          token, submissionId: submissionId.current,
        }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (typeof result.message !== "string") throw new Error("Unexpected response");
      setMessage(result.message);
      if (response.ok) setSent(true);
    } catch {
      setMessage("We couldn’t confirm sending. Your message is still here—please retry or email me directly.");
    } finally {
      inFlight.current = false;
      setBusy(false);
      resetChallenge();
    }
  }

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={renderChallenge} onError={() => setVerificationError(true)} />
      <noscript><p className="form-notice">Please enable JavaScript to use the form, or email me directly using the address on this page.</p></noscript>
      <form onSubmit={submit} className="inquiry-form" aria-label="Project inquiry" aria-busy={busy}>
        <fieldset disabled={busy || sent}>
          <legend className="visually-hidden">Your contact details and project</legend>
          <div className="form-row">
            <label htmlFor="contact-name">Name<input id="contact-name" name="name" autoComplete="name" required maxLength={120} /></label>
            <label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          </div>
          <label htmlFor="contact-company">Company <span>(optional)</span><input id="contact-company" name="company" autoComplete="organization" maxLength={120} /></label>
          <label htmlFor="contact-message">What do you have in mind?<textarea id="contact-message" name="message" required minLength={10} maxLength={5000} rows={7} aria-describedby="message-hint" /></label>
          <p className="field-hint" id="message-hint">A few details about your idea, goals, or what needs fixing. 10–5,000 characters.</p>
          <div className="form-trap" aria-hidden="true"><label htmlFor="contact-website">Leave this empty<input id="contact-website" name="website" tabIndex={-1} autoComplete="off" maxLength={200} /></label></div>
          <div ref={container} className="spam-check" />
          {verificationError && <p className="form-notice" role="status">The spam check couldn’t load. {widgetReady && <button type="button" onClick={resetChallenge}>Try the check again</button>} You can also email me directly.</p>}
          <button className="primary-link form-submit" type="submit" disabled={!token || busy || sent}>
            {sent ? "Message submitted" : busy ? "Sending…" : "Send message"}<ArrowRight aria-hidden="true" />
          </button>
          {!token && !sent && !verificationError && <p className="field-hint" role="status">Complete the spam check to send your message.</p>}
        </fieldset>
        <p ref={feedback} tabIndex={-1} className={`form-feedback${sent ? " success" : ""}`} role="status">{message}</p>
        {!sent && (message || verificationError) && <a className="contact-email" href={`mailto:${contactEmail}`}>Email me directly</a>}
      </form>
    </>
  );
}
