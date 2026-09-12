import {
  ArrowDownRight,
  ArrowRight,
  Braces,
  CalendarClock,
  Check,
  Cloud,
  CodeXml,
  Database,
  FileSignature,
  HeartHandshake,
  Layers3,
  LayoutDashboard,
  LockKeyhole,
  Smartphone,
  Sparkles,
  WalletCards,
} from "lucide-react";

const services = [
  {
    icon: Layers3,
    title: "Websites & web apps",
    text: "Create a sharp public presence or a capable browser-based product, built around what your customers and team actually need.",
    details: ["Marketing and company websites", "Dashboards and web applications", "Platforms and integrations"],
  },
  {
    icon: Smartphone,
    title: "Mobile & desktop apps",
    text: "Build thoughtful native or cross-platform software that feels at home on the devices where people use it.",
    details: ["iOS and Android products", "Desktop experiences", "Shared cross-platform systems"],
  },
  {
    icon: Sparkles,
    title: "Original products",
    text: "Shape an ambitious idea into focused software—from the first useful version to a product ready to grow.",
    details: ["Product definition", "Prototypes and internal tools", "Full-cycle engineering"],
  },
];

const supportingProjects = [
  {
    number: "03",
    icon: LayoutDashboard,
    name: "Wedding Dashboard",
    type: "Operations dashboard · Realtime collaboration",
    description:
      "A shared operations board that turns wedding planning into one coordinated view of vendors, payments, tasks, documents, and day-of timing.",
    proof: [
      "Realtime shared state across collaborators",
      "Payment ledger with duplicate safeguards",
      "Document uploads and change attribution",
    ],
    stack: "JavaScript · Supabase · GitHub Pages",
    status: "Single-event operations tool",
  },
  {
    number: "04",
    icon: FileSignature,
    name: "Builtproof",
    type: "SaaS platform · Workflow engineering",
    description:
      "A mobile-first business workspace for tradespeople to manage customers and jobs, create professional documents, and keep work moving in English or Spanish.",
    proof: [
      "Customer and job pipeline",
      "PDF proposals, invoices, and receipts",
      "Bilingual interface and signature workflows",
    ],
    stack: "Next.js · TypeScript · Supabase",
    status: "Product build in progress",
  },
  {
    number: "05",
    icon: WalletCards,
    name: "Lanes",
    type: "Consumer finance · Cross-platform product",
    description:
      "A calm money-management product that separates income into Bills, Spending, and Savings, then surfaces one trustworthy safe-to-spend number.",
    proof: [
      "Three-lane allocation model",
      "Payday splits and savings goals",
      "Expo app plus clickable product demo",
    ],
    stack: "Expo · React Native · Supabase · Zustand",
    status: "Prototype and product demo",
  },
  {
    number: "06",
    icon: CalendarClock,
    name: "When",
    type: "Native iOS · Social scheduling",
    description:
      "A native iPhone app that helps groups stop negotiating schedules in chat: propose times, compare availability, vote, lock a plan, and add it to calendars.",
    proof: [
      "Smart Suggest with poll fallback",
      "Calendar, contacts, QR, and invitation flows",
      "Local-first data with tested state rules",
    ],
    stack: "SwiftUI · SwiftData · EventKit · Supabase",
    status: "Native iOS product build",
  },
  {
    number: "07",
    icon: HeartHandshake,
    name: "Noir",
    type: "Cross-platform mobile · Social product",
    description:
      "A dating-app prototype exploring nearby discovery, saved profiles, connections, and messaging from one shared cross-platform codebase.",
    proof: [
      "Responsive web, iOS, and Android foundation",
      "Supabase-ready authentication and data boundary",
      "Shared TypeScript routing and component system",
    ],
    stack: "Expo · React Native · TypeScript · Supabase",
    status: "Prototype · Backend integration planned",
  },
];

const deliveryProcess = [
  ["01", "Frame", "Clarify the outcome, audience, constraints, and riskiest assumptions before implementation starts."],
  ["02", "Shape", "Translate the problem into a focused product flow and a technical plan you can understand."],
  ["03", "Build", "Deliver working software in reviewable slices, with decisions and tradeoffs made visible."],
  ["04", "Verify", "Test the important paths, document the system, and hand over a product you can maintain."],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="All-Purpose Apps, home">
          <span className="wordmark-symbol" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/all-purpose-apps-mark.png" alt="" />
          </span>
          <span className="wordmark-copy">
            All-Purpose Apps
            <small>Custom software for businesses and big ideas.</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a className="nav-cta" href="#contact">
            Start a conversation <ArrowRight aria-hidden="true" />
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-main">
          <div className="hero-content">
            <p className="eyebrow">
              <span /> All-purpose skills. Built for your purpose.
            </p>
            <h1>
              Your ideas.{" "}<em>Made from scratch.</em>
            </h1>
            <p className="hero-copy">
              I&apos;m Josh, the developer behind All-Purpose Apps. I build websites, web apps,
              mobile apps, desktop apps, and original products for people ready to make
              something useful, ambitious, or entirely new.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#work">
                View selected work <ArrowRight aria-hidden="true" />
              </a>
              <a className="text-link" href="#services">
                Explore services <ArrowDownRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/all-purpose-apps-seal.svg"
              alt="All-Purpose Apps — build, launch, grow; ideas into apps"
            />
          </div>
        </div>

        <div className="credibility-rail" aria-label="Portfolio highlights">
          <span><strong>07</strong> selected products</span>
          <span><strong>From scratch</strong> through launch</span>
          <span><strong>All-purpose</strong> across platforms</span>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-header">
          <div>
            <p className="section-label">Selected work</p>
            <h2>Products shaped around real needs.</h2>
          </div>
          <p>
            A selection of product, platform, and applied-engineering work. Each case study
            is grounded in verified functionality rather than invented business metrics.
          </p>
        </div>

        <article className="case-study featured-case">
          <div className="case-copy">
            <div className="case-meta"><span>01</span><span>Featured product</span></div>
            <p className="case-type">Event platform · Product engineering</p>
            <h3>Boothline</h3>
            <p className="case-summary">
              A reusable song-request platform that gives hosts a polished event workspace
              and guests a quick, mobile-first way to discover and request music.
            </p>
            <div className="case-scope">
              <div><span>Challenge</span><p>Make live song requests easy for guests and manageable for hosts across different event types.</p></div>
              <div><span>Solution</span><p>One product system for event creation, branded guest pages, QR sharing, search, and live queue operations.</p></div>
            </div>
            <ul className="proof-list">
              <li><Check />Fuzzy matching across a 10,000-song catalog</li>
              <li><Check />Cross-tab synchronization with guarded request rules</li>
              <li><Check />Timezone-aware scheduling and reusable event themes</li>
            </ul>
            <p className="case-stack">React · TypeScript · Product design · Responsive web</p>
            <p className="case-status">Interactive product concept · Production path documented</p>
          </div>
          <div className="case-visual boothline-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/projects/boothline-dashboard.png" alt="Boothline event dashboard showing event and request activity" />
            <span>Host workspace</span>
          </div>
        </article>

        <article className="case-study camera-case">
          <div className="case-visual camera-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/projects/event-camera-icon.png" alt="Gatherroll application icon" width={1024} height={1024} />
            <div className="visual-note">
              <Smartphone aria-hidden="true" />
              <span>Designed around the phone already in every guest&apos;s hand</span>
            </div>
          </div>
          <div className="case-copy">
            <div className="case-meta"><span>02</span><span>Event utility</span></div>
            <p className="case-type">Guest photography · Mobile cloud application</p>
            <h3>Gatherroll</h3>
            <p className="case-summary">
              A private, disposable-camera-style experience that lets wedding guests capture
              candid moments without installing an app, while organizers retain event controls
              and direct cloud delivery.
            </p>
            <div className="case-scope">
              <div><span>Challenge</span><p>Collect candid guest photos without requiring an app-store download or a complicated upload flow.</p></div>
              <div><span>Solution</span><p>A mobile-first capture experience with photo limits, previews, private administration, and Google Drive delivery.</p></div>
            </div>
            <ul className="proof-list">
              <li><Check />Google OAuth and Drive upload integration</li>
              <li><Check />Secure sessions, password rotation, and D1 persistence</li>
              <li><Check />Installable experience with offline fallback</li>
            </ul>
            <p className="case-stack">React · OAuth · Cloudflare · Google Drive</p>
            <p className="case-status">Private event application · Built for mobile browsers</p>
          </div>
        </article>

        <div className="project-grid">
          {supportingProjects.map(({ number, icon: Icon, name, type, description, proof, stack, status }) => (
            <article className="project-card" key={name}>
              <div className="project-top">
                <span>{number}</span>
                <Icon aria-hidden="true" />
              </div>
              <p className="case-type">{type}</p>
              <h3>{name}</h3>
              <p className="project-description">{description}</p>
              <ul>
                {proof.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="case-stack">{stack}</p>
              <p className="project-status">{status}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-header">
          <div>
            <p className="section-label">What I build</p>
            <h2>One versatile partner. Whatever the platform.</h2>
          </div>
          <p>
            Bring me the goal, the rough sketch, or the stubborn problem. I&apos;ll help choose
            the right shape for it and turn it into software people can rely on.
          </p>
        </div>
        <div className="service-grid">
          {services.map(({ icon: Icon, title, text, details }, index) => (
            <article key={title}>
              <div className="service-icon"><Icon aria-hidden="true" /></div>
              <span className="service-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul>{details.map((detail) => <li key={detail}><Check />{detail}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section">
        <div className="process-intro">
          <p className="section-label light">How it gets made</p>
          <h2>Built carefully, from the first measure.</h2>
          <p>
            You should always understand what is being built, why a decision was made, and
            what comes next. The process is structured to keep progress visible.
          </p>
        </div>
        <ol className="process-list">
          {deliveryProcess.map(([number, title, text]) => (
            <li key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-section" id="about">
        <div className="about-heading">
          <p className="section-label">The company</p>
          <h2>Broad capability. Personal attention.</h2>
        </div>
        <div className="about-copy">
          <p className="about-lead">
            All-Purpose Apps is my software development company, built to give businesses
            and big ideas one dependable path from possibility to working product.
          </p>
          <p>
            The name borrows the spirit of all-purpose flour: a versatile foundation that
            adapts to the job at hand. For me, that can mean a focused website, a business
            web app, a native mobile experience, a desktop tool, or an original product.
            The technology changes; my standard stays the same—clear decisions, dependable
            behavior, and work you can understand.
          </p>
          <div className="principles">
            <div><LockKeyhole /><span><strong>Risk made explicit</strong>Security and data tradeoffs are documented and matched to the product stage.</span></div>
            <div><Database /><span><strong>Built for the real flow</strong>Architecture follows the actual product need and its constraints.</span></div>
            <div><CodeXml /><span><strong>Made understandable</strong>Documentation and explanation are part of the finished work.</span></div>
          </div>
          <div className="technology-list" aria-label="Technology experience">
            <span><CodeXml /> React / TypeScript</span>
            <span><Database /> Next.js / Supabase</span>
            <span><Smartphone /> SwiftUI / iOS</span>
            <span><Braces /> Expo / React Native</span>
            <span><Cloud /> Cloudflare / D1</span>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="section-label light"><span /> Available for select engagements</p>
          <h2>Bring the idea. Let&apos;s make it real.</h2>
        </div>
        <div className="contact-bottom">
          <p>
            Tell me what you&apos;re building, improving, or trying to untangle. I&apos;ll bring the
            range to find the clearest route forward—and the care to build it well.
          </p>
          <div className="contact-placeholder" aria-label="Contact details pending">
            <span>Public contact details</span>
            <strong>Ready to add</strong>
            <ArrowRight aria-hidden="true" />
          </div>
        </div>
      </section>

      <footer>
        <a className="wordmark footer-mark" href="#top" aria-label="All-Purpose Apps, back to top">
          <span className="wordmark-symbol" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/all-purpose-apps-mark.png" alt="" />
          </span>
        </a>
        <p>All-Purpose Apps<br />By Joshua Perez Leduc</p>
        <p>Web · Mobile · Desktop · Products</p>
        <a href="#top">Back to top <ArrowDownRight aria-hidden="true" /></a>
      </footer>
    </main>
  );
}
