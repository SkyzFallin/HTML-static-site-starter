import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ArrowRight,
  Shield,
  FileText,
  Sparkles,
  Code2,
  Check,
} from "lucide-react";

// Single-file personal domain homepage (React + Tailwind)
// - Responsive, clean, minimal
// - Swap content in the CONFIG section

const CONFIG = {
  name: "Your Name",
  role: "Security Consultant / Builder",
  location: "Remote • USA",
  tagline:
    "I help teams ship secure systems—through offensive testing, practical fixes, and clear reporting.",
  bio:
    "I work across network, cloud, and application security. I like high-signal findings, reproducible proof, and remediation that actually sticks.",
  primaryCta: { label: "Contact", href: "mailto:you@yourdomain.com" },
  secondaryCta: { label: "Download Resume", href: "#resume" },
  links: {
    email: "you@yourdomain.com",
    github: "https://github.com/yourhandle",
    linkedin: "https://www.linkedin.com/in/yourhandle",
  },
  highlights: [
    {
      icon: Shield,
      title: "Offensive security",
      desc: "Internal/External testing, web apps, cloud reviews, and attack-path analysis.",
    },
    {
      icon: FileText,
      title: "Actionable reporting",
      desc: "Clear write-ups, risk context, and step-by-step remediation guidance.",
    },
    {
      icon: Code2,
      title: "Tooling",
      desc: "Lightweight scripts that speed up recon, validation, and evidence capture.",
    },
  ],
  projects: [
    {
      title: "Home Network Assessment (Template)",
      desc: "A concise scope + report format for network-only home security reviews.",
      tags: ["Consulting", "Reporting"],
      href: "#",
    },
    {
      title: "Attack Path Notes",
      desc: "Short write-ups on common misconfigs and how to prioritize fixes.",
      tags: ["Red Team", "Defense"],
      href: "#",
    },
    {
      title: "Mini Tool: Evidence Packager",
      desc: "Automates screenshot naming, hashing, and report-ready evidence bundles.",
      tags: ["Python", "Automation"],
      href: "#",
    },
  ],
  services: [
    {
      title: "Penetration Testing",
      bullets: [
        "Network & perimeter testing",
        "Web application testing",
        "Wireless assessments",
        "Retesting & validation",
      ],
    },
    {
      title: "Security Reviews",
      bullets: [
        "Cloud configuration reviews",
        "Threat modeling workshops",
        "Secure design feedback",
        "Policy & controls mapping",
      ],
    },
    {
      title: "Advisory",
      bullets: [
        "Security roadmap planning",
        "Finding triage & prioritization",
        "Executive-friendly summaries",
        "Enablement & mentoring",
      ],
    },
  ],
  resume: {
    note:
      "Replace this section with a link to a PDF hosted on your domain (e.g., /resume.pdf).",
  },
};

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200">
      {children}
    </span>
  );
}

function Card({ children, className }) {
  return (
    <div
      className={classNames(
        "rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60",
        className
      )}
    >
      {children}
    </div>
  );
}

function IconLink({ href, label, Icon }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/60 px-3 py-2 text-sm text-zinc-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100 dark:hover:bg-zinc-900"
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
      <ExternalLink className="h-3.5 w-3.5 opacity-60" />
    </a>
  );
}

function Nav({ active, onJump }) {
  const items = [
    { id: "work", label: "Work" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "resume", label: "Resume" },
  ];
  return (
    <div className="sticky top-0 z-40 -mx-4 mb-6 px-4 pt-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {CONFIG.name}
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">
                {CONFIG.role}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => onJump(it.id)}
                className={classNames(
                  "rounded-xl px-3 py-2 text-sm transition",
                  active === it.id
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                )}
              >
                {it.label}
              </button>
            ))}
          </div>

          <a
            href={CONFIG.primaryCta.href}
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow dark:bg-white dark:text-zinc-900"
          >
            {CONFIG.primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ kicker, title, desc }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2">
        {kicker ? <Pill>{kicker}</Pill> : null}
      </div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      {desc ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-950" />
      <motion.div
        className="absolute -top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-zinc-200/50 blur-3xl dark:bg-zinc-800/30"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute -bottom-24 right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-zinc-200/40 blur-3xl dark:bg-zinc-800/25"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15 }}
      />
    </div>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("work");

  const ids = useMemo(() => ["work", "services", "about", "resume"], []);

  React.useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        // pick the most visible intersecting section
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (vis[0]?.target?.id) setActive(vis[0].target.id);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  const onJump = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return { active, onJump };
}

export default function PersonalDomainWebsite() {
  const { active, onJump } = useActiveSection();

  return (
    <div className="min-h-screen">
      <Background />
      <Nav active={active} onJump={onJump} />

      <main className="mx-auto max-w-6xl px-4 pb-24">
        {/* Hero */}
        <section className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Pill>{CONFIG.location}</Pill>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
              {CONFIG.tagline}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {CONFIG.bio}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={CONFIG.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow dark:bg-white dark:text-zinc-900"
              >
                <Mail className="h-4 w-4" />
                {CONFIG.primaryCta.label}
              </a>
              <a
                href={CONFIG.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/60 px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100 dark:hover:bg-zinc-900"
              >
                <FileText className="h-4 w-4" />
                {CONFIG.secondaryCta.label}
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <IconLink href={`mailto:${CONFIG.links.email}`} label="Email" Icon={Mail} />
              <IconLink href={CONFIG.links.github} label="GitHub" Icon={Github} />
              <IconLink href={CONFIG.links.linkedin} label="LinkedIn" Icon={Linkedin} />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/40 dark:from-zinc-900/30 dark:to-zinc-950/10" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Now booking
                    </div>
                    <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      Small, focused engagements with crisp deliverables.
                    </div>
                  </div>
                  <Pill>
                    <span className="inline-flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" />
                      Available
                    </span>
                  </Pill>
                </div>

                <div className="mt-5 grid gap-3">
                  {CONFIG.highlights.map((h) => (
                    <div
                      key={h.title}
                      className="flex gap-3 rounded-2xl border border-zinc-200 bg-white/60 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40"
                    >
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                        <h.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {h.title}
                        </div>
                        <div className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {h.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => onJump("work")}
                    className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow dark:bg-white dark:text-zinc-900"
                  >
                    See selected work
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Work */}
        <section id="work" className="mt-16">
          <SectionHeader
            kicker="Selected"
            title="Work"
            desc="A few representative projects. Replace links with your write-ups, repos, or case studies."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CONFIG.projects.map((p) => (
              <motion.a
                key={p.title}
                href={p.href}
                target={p.href?.startsWith("http") ? "_blank" : undefined}
                rel={p.href?.startsWith("http") ? "noreferrer" : undefined}
                className="group"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
              >
                <Card className="h-full transition group-hover:-translate-y-0.5 group-hover:shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {p.title}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {p.desc}
                      </p>
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 text-zinc-400 transition group-hover:translate-x-0.5" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                </Card>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mt-16">
          <SectionHeader
            kicker="How I help"
            title="Services"
            desc="Simple packages that map to clear outcomes. Customize as needed."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {CONFIG.services.map((s) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
              >
                <Card className="h-full">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {s.title}
                  </div>
                  <ul className="mt-3 space-y-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                      >
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-zinc-400" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mt-16">
          <SectionHeader
            kicker="About"
            title="A little more"
            desc="Add a short story, what you value, and what clients can expect when working with you."
          />
          <div className="grid gap-4 lg:grid-cols-12">
            <Card className="lg:col-span-7">
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  My approach:
                </span>{" "}
                clarify scope, focus on high-impact paths, and document everything so fixes are easy to
                validate.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {["Scoping", "Testing", "Reporting", "Retesting"].map((k) => (
                  <div
                    key={k}
                    className="rounded-2xl border border-zinc-200 bg-white/60 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40"
                  >
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {k}
                    </div>
                    <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {k === "Scoping" && "Define objectives, rules, and success criteria."}
                      {k === "Testing" && "Find real-world exploit paths, not just issues."}
                      {k === "Reporting" && "Explain risk and provide concrete next steps."}
                      {k === "Retesting" && "Verify fixes and close the loop with evidence."}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="lg:col-span-5">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Quick facts
              </div>
              <div className="mt-3 space-y-3">
                {[
                  { k: "Primary focus", v: "Offensive security + practical remediation" },
                  { k: "Deliverables", v: "Report, evidence pack, and fix validation" },
                  { k: "Style", v: "Direct, calm, collaborative" },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-zinc-200 bg-white/60 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40"
                  >
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">{row.k}</div>
                    <div className="text-right text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {row.v}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <a
                  href={`mailto:${CONFIG.links.email}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow dark:bg-white dark:text-zinc-900"
                >
                  <Mail className="h-4 w-4" />
                  Email me
                </a>
              </div>
            </Card>
          </div>
        </section>

        {/* Resume */}
        <section id="resume" className="mt-16">
          <SectionHeader
            kicker="Resume"
            title="Grab a copy"
            desc="Host a PDF at /resume.pdf and update this button link."
          />
          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Resume PDF
                </div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {CONFIG.resume.note}
                </div>
              </div>
              <a
                href="/resume.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white/60 px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100 dark:hover:bg-zinc-900"
              >
                <FileText className="h-4 w-4" />
                Download
              </a>
            </div>
          </Card>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-zinc-200 pt-8 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              © {new Date().getFullYear()} {CONFIG.name}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a className="hover:text-zinc-900 dark:hover:text-zinc-100" href={`mailto:${CONFIG.links.email}`}>
                {CONFIG.links.email}
              </a>
              <span className="opacity-40">•</span>
              <a className="hover:text-zinc-900 dark:hover:text-zinc-100" href={CONFIG.links.github}>
                GitHub
              </a>
              <span className="opacity-40">•</span>
              <a className="hover:text-zinc-900 dark:hover:text-zinc-100" href={CONFIG.links.linkedin}>
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
