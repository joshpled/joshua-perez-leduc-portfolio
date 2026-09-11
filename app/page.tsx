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
    title: "Product development",
    text: "Turn a concept into a focused, usable product—from scope and user flows through implementation and launch.",
    details: ["Product definition", "UX and interface systems", "Full-stack implementation"],
  },
  {
    icon: Cloud,
    title: "Platforms & integrations",
    text: "Connect interfaces to durable data, cloud infrastructure, third-party services, and secure user workflows.",
    details: ["Cloud architecture", "API integrations", "Authentication and data"],
  },
  {
    icon: Sparkles,
    title: "Custom engineering",
    text: "Build the specialized automation, internal tool, or technical solution that an off-the-shelf product cannot provide.",
    details: ["Workflow automation", "Internal tools", "Technical prototypes"],
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

const process = [
  ["01", "Frame", "Clarify the outcome, audience, constraints, and riskiest assumptions before implementation starts."],
  ["02", "Shape", "Translate the problem into a focused product flow and a technical plan you can understand."],
  ["03", "Build", "Deliver working software in reviewable slices, with decisions and tradeoffs made visible."],
  ["04", "Verify", "Test the important paths, document the system, and hand over a product you can maintain."],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Joshua Perez Leduc, home">
          <span>JPL</span>
          <span className="wordmark-copy">
            Joshua Perez Leduc
            <small>Independent software engineer</small>
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
              <span /> Available for select freelance projects
            </p>
            <h1>
              Software, designed with purpose. <em>Engineered to last.</em>
            </h1>
            <p className="hero-copy">
              I help founders and teams turn early ideas and complex requirements into
              clear, dependable digital products—from first decision to working software.
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

          <aside className="hero-profile">
            <p>Independent engineering practice</p>
            <div className="profile-monogram" aria-hidden="true">JPL</div>
            <dl>
              <div>
                <dt>Focus</dt>
                <dd>Product and platform engineering</dd>
              </div>
              <div>
                <dt>Capabilities</dt>
                <dd>Web, mobile, cloud, and automation</dd>
              </div>
              <div>
                <dt>Engagement</dt>
                <dd>Focused builds and technical partnerships</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="credibility-rail" aria-label="Portfolio highlights">
          <span><strong>07</strong> verified case studies</span>
          <span><strong>Full-cycle</strong> product delivery</span>
          <span><strong>Multi-platform</strong> engineering experience</span>
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
            <p className="section-label">Services</p>
            <h2>One partner across the whole problem.</h2>
          </div>
          <p>
            Clear enough to discuss the business need, technical enough to build the system,
            and disciplined enough to leave it understandable.
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
          <p className="section-label light">How I work</p>
          <h2>Clarity at every stage.</h2>
          <p>
            You should always understand what is being built, why a decision was made, and
            what comes next. The process is structured to keep progress visible.
          </p>
        </div>
        <ol className="process-list">
          {process.map(([number, title, text]) => (
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
          <p className="section-label">The practice</p>
          <h2>Good software is considered, not merely assembled.</h2>
        </div>
        <div className="about-copy">
          <p className="about-lead">
            I work where product judgment and engineering meet—connecting the experience a
            person needs with the system required to support it.
          </p>
          <p>
            My selected work spans live-event products, wedding operations, field-service
            workflows, consumer finance, native iOS scheduling, and cross-platform mobile
            products. The technology changes; the standard does not: clear decisions,
            dependable behavior, and maintainable work.
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
          <h2>Let&apos;s turn the right idea into working software.</h2>
        </div>
        <div className="contact-bottom">
          <p>
            Share what you are building, improving, or trying to untangle. I&apos;ll help you
            identify the clearest route forward.
          </p>
          <div className="contact-placeholder" aria-label="Contact details pending">
            <span>Public contact details</span>
            <strong>Ready to add</strong>
            <ArrowRight aria-hidden="true" />
          </div>
        </div>
      </section>

      <footer>
        <a className="wordmark footer-mark" href="#top" aria-label="Back to top"><span>JPL</span></a>
        <p>Joshua Perez Leduc<br />Independent software engineer</p>
        <p>Product · Web · Mobile · Cloud</p>
        <a href="#top">Back to top <ArrowDownRight aria-hidden="true" /></a>
      </footer>
    </main>
  );
}
