import {
  ArrowDownRight,
  ArrowRight,
  Braces,
  Cloud,
  CodeXml,
  Gauge,
  Layers3,
  Smartphone,
  Sparkles,
} from "lucide-react";

const capabilities = [
  {
    icon: Layers3,
    title: "Product engineering",
    text: "From a loose concept to a working product: flows, interface, architecture, implementation, and the decisions between them.",
  },
  {
    icon: Cloud,
    title: "Full-stack systems",
    text: "Responsive frontends connected to durable data, third-party services, authentication, secure sessions, and cloud infrastructure.",
  },
  {
    icon: Sparkles,
    title: "Purpose-built tools",
    text: "Automations, internal utilities, research interfaces, and unusual technical work shaped around a specific real-world problem.",
  },
];

const compactProjects = [
  {
    number: "03",
    name: "DJ Request List",
    kind: "Installable event app",
    description:
      "A guest request experience paired with a PIN-protected live DJ queue, rate-limited access, offline support, and cloud persistence.",
    stack: ["React", "Cloudflare D1", "PWA", "Security"],
    accent: "cyan",
    mark: "DR",
  },
  {
    number: "04",
    name: "Velocity Overdrive",
    kind: "Game systems · C# / .NET",
    description:
      "A configurable Dead Cells gameplay mod that adjusts player combat and movement while deliberately preserving enemy behavior and safety checks.",
    stack: ["C#", ".NET 10", "Runtime hooks", "Configuration"],
    accent: "orange",
    mark: "3×",
  },
  {
    number: "05",
    name: "Solo Developer’s Stack Guide",
    kind: "Interactive research product",
    description:
      "A ten-chapter decision tool combining technical research, platform comparisons, transparent cost models, and an interactive release roadmap.",
    stack: ["TypeScript", "Data modeling", "Cost engine", "Research"],
    accent: "violet",
    mark: "10",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Joshua Perez Leduc, home">
          <span>JPL</span>
          <span className="wordmark-copy">
            Software engineer
            <br />
            Independent practice
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Selected work</a>
          <a href="#services">Services</a>
          <a href="#contact">Start a project</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">
          <span /> Available for select freelance projects
        </p>
        <h1>
          I build software that makes ambitious ideas <em>work.</em>
        </h1>
        <div className="hero-lower">
          <p className="hero-copy">
            I&apos;m Joshua Perez Leduc, an independent software engineer turning early ideas
            into thoughtful, dependable products—from event platforms to native apps and
            specialized tools.
          </p>
          <a className="round-link" href="#work" aria-label="See selected work">
            <ArrowDownRight aria-hidden="true" />
          </a>
        </div>
        <div className="capability-rail" aria-label="Core capabilities">
          <span>01 / Product engineering</span>
          <span>02 / Web &amp; mobile</span>
          <span>03 / Cloud systems</span>
          <span>04 / Automation</span>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected work / 2026</p>
          <div>
            <h2>Built for real moments.</h2>
            <p className="section-intro">
              Each project started with a specific need. The work spans product strategy,
              interaction design, engineering, deployment, and the less glamorous edge cases
              that make software trustworthy.
            </p>
          </div>
        </div>

        <article className="showcase showcase-boothline">
          <div className="showcase-copy">
            <p className="project-number">01 / Featured product</p>
            <div>
              <p className="project-kind">Event platform · Full-stack web</p>
              <h3>Boothline</h3>
              <p className="project-description">
                A reusable song-request platform for any kind of gathering. Hosts can create
                branded events, share guest links and QR codes, manage a live queue, and reuse
                their setup for the next crowd.
              </p>
              <ul className="outcome-list" aria-label="Boothline engineering highlights">
                <li>Fuzzy search across a 10,000-song catalog</li>
                <li>Cross-tab synchronization and durable local demo state</li>
                <li>Timezone-aware event controls and guarded request rules</li>
              </ul>
              <div className="tag-row">
                <span>React</span>
                <span>TypeScript</span>
                <span>Product design</span>
                <span>Responsive UX</span>
              </div>
              <p className="project-status">Interactive product concept · Production path documented</p>
            </div>
          </div>
          <div className="showcase-visual boothline-visual">
            {/* Project-owned image with fixed container dimensions. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/boothline-dashboard.png"
              alt="Boothline event dashboard showing live events and request activity"
            />
          </div>
        </article>

        <article className="showcase showcase-camera">
          <div className="showcase-visual camera-visual">
            {/* Project-owned image; width and height preserve its square aspect ratio. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/event-camera-icon.png"
              alt="Our Wedding Camera app icon with gold film reels and JG monogram"
              width={1024}
              height={1024}
            />
            <div className="camera-caption">
              <Smartphone aria-hidden="true" />
              <span>Designed around the phone already in every guest&apos;s hand</span>
            </div>
          </div>
          <div className="showcase-copy camera-copy">
            <p className="project-number">02 / Live event utility</p>
            <div>
              <p className="project-kind">Mobile web · Cloud integration</p>
              <h3>Event Camera Platform</h3>
              <p className="project-description">
                A private, disposable-camera-style experience for wedding guests. It limits
                captures, previews photos, uploads directly to Google Drive, and gives the
                event owner a protected control panel.
              </p>
              <ul className="outcome-list" aria-label="Event Camera engineering highlights">
                <li>Google OAuth and Drive upload integration</li>
                <li>Secure sessions, password rotation, and D1 persistence</li>
                <li>Installable mobile experience with offline fallback</li>
              </ul>
              <div className="tag-row">
                <span>React</span>
                <span>OAuth</span>
                <span>Cloudflare</span>
                <span>Google Drive</span>
              </div>
            </div>
          </div>
        </article>

        <div className="project-grid">
          {compactProjects.map((project) => (
            <article className={`project-card ${project.accent}`} key={project.name}>
              <div className="project-card-top">
                <span>{project.number}</span>
                <span className="project-mark" aria-hidden="true">{project.mark}</span>
              </div>
              <p className="project-kind">{project.kind}</p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-kicker">
          <p className="eyebrow">How I can help</p>
          <p className="services-lead">
            One engineer across the whole problem—clear enough to discuss the product,
            technical enough to build it properly.
          </p>
        </div>
        <div className="capability-grid">
          {capabilities.map(({ icon: Icon, title, text }, index) => (
            <article key={title}>
              <div className="capability-top">
                <span>0{index + 1}</span>
                <Icon aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className="process-block">
          <div className="process-title">
            <p className="eyebrow">Working together</p>
            <h2>Clear thinking.<br />Visible progress.</h2>
          </div>
          <ol className="process-list">
            <li>
              <span>01</span>
              <div><h3>Define the real problem</h3><p>We turn the initial idea into a focused outcome, with the risks and unknowns made visible.</p></div>
            </li>
            <li>
              <span>02</span>
              <div><h3>Build a useful first slice</h3><p>You see the product early, while feedback is still cheap and the direction is easy to change.</p></div>
            </li>
            <li>
              <span>03</span>
              <div><h3>Engineer the full experience</h3><p>I connect interface, data, integrations, and edge cases into one coherent system.</p></div>
            </li>
            <li>
              <span>04</span>
              <div><h3>Verify and hand it over</h3><p>The result is tested, documented, and explained so you understand what you own.</p></div>
            </li>
          </ol>
        </div>
      </section>

      <section className="about-section">
        <div className="about-statement">
          <p className="eyebrow">The practice</p>
          <h2>Software should feel considered—not assembled.</h2>
        </div>
        <div className="about-detail">
          <p>
            My work sits where product judgment and engineering meet. I care about what a
            person is trying to accomplish, how the system behaves under pressure, and
            whether the next person can understand the choices inside it.
          </p>
          <p>
            That has taken me from consumer event products and cloud-backed PWAs to a .NET
            game mod, an iOS development pipeline, research tools, QR workflows, and
            practical automation. Different outputs; the same discipline.
          </p>
          <div className="tool-cloud" aria-label="Technology experience">
            <span><CodeXml />React / TypeScript</span>
            <span><Cloud />Cloudflare / D1</span>
            <span><Smartphone />SwiftUI / iOS</span>
            <span><Braces />C# / .NET</span>
            <span><Gauge />Testing / performance</span>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="eyebrow"><span /> Now booking select projects</p>
        <h2>Have an idea that deserves to become real?</h2>
        <div className="contact-bottom">
          <p>
            Tell me what you&apos;re trying to build, improve, or untangle. I&apos;ll help you find
            the clearest route from problem to working software.
          </p>
          <div className="contact-placeholder" aria-label="Contact details pending">
            <span>Contact details</span>
            <strong>To be added</strong>
            <ArrowRight aria-hidden="true" />
          </div>
        </div>
      </section>

      <footer>
        <a className="wordmark footer-mark" href="#top"><span>JPL</span></a>
        <p>Joshua Perez Leduc<br />Independent software engineer</p>
        <p>Web · Mobile · Cloud · Automation</p>
        <a href="#top">Back to top <ArrowDownRight aria-hidden="true" /></a>
      </footer>
    </main>
  );
}
