import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import {
  Network,
  Users,
  TrendingUp,
  Target,
  Ear,
  Compass,
  Rocket,
  CheckCircle2,
  XCircle,
  ArrowRight,
  BarChart3,
  ShieldAlert,
} from 'lucide-react';

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;
if (TRACKING_ID) ReactGA.initialize(TRACKING_ID);

/* Campaign palette (matches the election flyer) */
const NAVY = 'bg-[#0E1E4A]';
const HEADING = 'text-[#0E1E4A] dark:text-white';
const RED_TEXT = 'text-[#C8102E] dark:text-[#ff5c6f]';
const GOLD_TEXT = 'text-[#E8B341]';

const foundation = [
  {
    k: 'Carry forward',
    v: 'Document the programs, partnerships and practices already in place so that they continue smoothly into the next term.',
  },
  {
    k: 'One committee',
    v: 'Plan with the new executive team. The Strategist helps coordinate priorities; decisions remain collective.',
  },
  {
    k: 'Four priorities',
    v: 'Contribute in four areas: peer learning, inclusion, opportunities and planning.',
  },
  {
    k: 'Member feedback',
    v: 'Use member feedback and a few simple indicators to decide what to continue or expand.',
  },
];

const priorities = [
  {
    icon: Network,
    title: 'Community of Practice',
    tagline:
      'A space where we learn, build and share knowledge regularly, not only at events.',
    why: 'Regular, member-led sessions and a shared repository allow members to learn from one another and keep useful material from one term to the next.',
    program: 'Data Circles',
    programDetail:
      'Fortnightly 60-minute sessions where a member presents a project, paper or tool. Topic-based study groups (ML, NLP, data engineering, analytics). A shared repository of notebooks and resources.',
    measure: 'Active members (2+ sessions); member-led sessions',
    target: '6 sessions per term · 40% of members active',
  },
  {
    icon: Users,
    title: 'Gender Inclusion',
    tagline: 'Every voice welcome and heard in data science.',
    why: 'Inclusion can be seen in who presents and leads activities, not only in who attends them.',
    program: 'Women in Data',
    programDetail:
      'Talks and mentorship with women practitioners and alumni. Balanced speaker lineups planned for the whole term. Rotating facilitators. Meeting times reviewed for accessibility. Anonymous feedback channel.',
    measure: 'Share of women attending, presenting and leading',
    target: '≥ 40% of speakers & facilitators are women',
  },
  {
    icon: TrendingUp,
    title: 'More Opportunities',
    tagline:
      'Connecting members to projects, internships and partners outside the classroom.',
    why: 'Many members hope the club will help them find internships, applied projects and professional contacts. This would build on the club’s existing connections.',
    program: 'Opportunity Board',
    programDetail:
      'Weekly digest of internships, competitions, datasets and scholarships. Possible partnerships with industry and research labs. A Kaggle/Zindi competition team. Alumni career sessions.',
    measure: 'Opportunities shared; members who applied; partnerships',
    target: '1 digest per week · 1 competition team',
  },
  {
    icon: Target,
    title: 'Clear Priorities',
    tagline:
      'A focused roadmap with goals we can measure and achieve together.',
    why: 'A shared roadmap can help a new committee agree on what to do first. Ideas that do not fit the current term can be recorded for later.',
    program: 'Public Roadmap',
    programDetail:
      'One-page term strategy and public roadmap. Monthly executive review. Mid-term review of each program. One-page end-of-term report.',
    measure: 'Roadmap delivered on time; member satisfaction',
    target: '80% of roadmap delivered · satisfaction ≥ 4/5',
  },
];

const phases = [
  {
    icon: Ear,
    days: 'Days 1–30',
    title: 'Listen & learn',
    items: [
      'Handover sessions with the outgoing leadership to capture what works',
      'One-to-one meetings with each member of the new committee',
      'Member survey: 10 questions, under 5 minutes',
    ],
    output: 'Handover notes and member insights',
  },
  {
    icon: Compass,
    days: 'Days 31–60',
    title: 'Plan together',
    items: [
      'Term strategy: one goal, four priorities, 2–3 targets each',
      'Strategy workshop with the new committee to agree it',
      'Roadmap: programs, dates, owners, around the exam calendar',
    ],
    output: 'Agreed strategy & roadmap, published',
  },
  {
    icon: Rocket,
    days: 'Days 61–100',
    title: 'Deliver & measure',
    items: [
      'Launch the first program under each priority',
      'Dashboard updated every two weeks',
      'Mid-term review to refine each program',
    ],
    output: 'Progress report to members, with data',
  },
];

const metrics = [
  { label: 'Active members', target: '40%', note: 'attended 2+ activities' },
  { label: 'Member-led sessions', target: '6', note: 'per term' },
  { label: 'Women speakers & facilitators', target: '≥40%', note: 'of total' },
  { label: 'Opportunity digests', target: '1/wk', note: 'and applications' },
  { label: 'Roadmap delivered', target: '80%', note: 'on schedule' },
  { label: 'Member satisfaction', target: '≥4/5', note: 'end-of-term survey' },
];

const roleDoes = [
  ['Direction', 'A written term strategy: goal, priorities, success criteria.'],
  [
    'Prioritization',
    'Ranking proposals by impact and effort against priorities.',
  ],
  [
    'Roadmap',
    'A term calendar with owners and dates, agreed by the executive team.',
  ],
  ['Measurement', 'A small set of metrics, tracked and reviewed openly.'],
  [
    'Member insight',
    'Surveys and interviews to ground decisions in member needs.',
  ],
  [
    'Partnerships',
    'Identifying which companies, labs, clubs and alumni to work with.',
  ],
];

const roleNot = [
  'A second President. The executive team decides collectively; the Strategist advises and shapes.',
  'The events lead. The Strategist selects which events serve the strategy; the events lead runs them.',
  'A single point of execution. Delegation keeps time for planning and review.',
];

const risks = [
  [
    'Academic workload',
    'Roadmap built around the exam calendar; no major events in exam weeks.',
  ],
  [
    'Sustaining momentum',
    'Track participation and ask members for feedback regularly; adjust format or timing early when needed.',
  ],
  [
    'Range of skill levels',
    'Two tracks (foundations, advanced) and beginner–mentor pairing.',
  ],
  [
    'Resources',
    'Low-cost formats first; in-kind partnerships (venues, datasets, cloud credits, mentors).',
  ],
  [
    'Realistic commitments',
    'Commit to processes the committee controls; report progress openly and update the plan when needed.',
  ],
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div
    className={`font-mono text-xs sm:text-sm tracking-[0.25em] uppercase ${RED_TEXT}`}
  >
    {'// '}
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className={`mt-3 text-3xl sm:text-4xl font-bold ${HEADING}`}>
    {children}
  </h2>
);

const Manifesto: NextPage = () => {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/', title: 'Manifesto' });
  }, []);

  const track = (action: string) =>
    ReactGA.event({ category: 'Manifesto', action });

  return (
    <>
      <Head>
        <title>Jean de Dieu UWINTWALI · Strategist Candidate</title>
        <meta
          name="description"
          content="Manifesto of Jean de Dieu UWINTWALI, candidate for Strategist of the CMU-Africa Data Science Club: four priorities, a plan for the first 100 days, and how progress would be reported."
        />
      </Head>

      <div className="relative my-8 sm:my-14 space-y-20 sm:space-y-28">
        {/* ───────────── HERO ───────────── */}
        <section className="grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/campaign/ds-club-logo.jpg"
                alt="CMU-Africa Data Science Club logo"
                className="h-12 w-12 rounded-lg border shadow-sm object-cover"
              />
              <div className="leading-tight">
                <div className={`font-semibold ${HEADING}`}>
                  Data Science Club
                </div>
                <div className={`text-sm tracking-[0.2em] ${RED_TEXT}`}>
                  ELECTIONS · CMU-AFRICA
                </div>
              </div>
            </div>

            <h1
              className={`text-6xl sm:text-7xl xl:text-8xl font-black tracking-tight ${HEADING}`}
            >
              VOTE
            </h1>
            <div className="mt-3 inline-block rounded-xl bg-[#C8102E] px-6 py-3 shadow-[0_6px_0_0_#0E1E4A] dark:shadow-[0_6px_0_0_#E8B341]">
              <div className="text-[#F5D58A] text-sm sm:text-base font-semibold tracking-wide">
                Jean de Dieu UWINTWALI
              </div>
              <div className="text-white text-5xl sm:text-6xl font-black leading-none">
                JEAN
              </div>
            </div>
            <div className="mt-6 flex w-fit rounded-lg overflow-hidden border-2 border-[#0E1E4A] dark:border-[#E8B341]">
              <span
                className={`${NAVY} ${GOLD_TEXT} px-4 py-2 font-black text-xl sm:text-2xl`}
              >
                FOR
              </span>
              <span className="bg-white text-[#0E1E4A] px-4 py-2 font-black text-xl sm:text-2xl tracking-widest">
                STRATEGIST
              </span>
            </div>

            <p className="mt-8 text-lg text-muted-foreground max-w-xl">
              MS student in Engineering Artificial Intelligence at Carnegie
              Mellon University Africa, with an interest in AI and machine
              learning research.
            </p>
            <p className="mt-2 text-base text-muted-foreground font-light max-w-xl">
              This page describes four priorities, a plan for the first 100
              days, and how progress would be reported to members.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#priorities"
                onClick={() => track('See priorities')}
                className={`${NAVY} text-white px-5 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:opacity-90 transition`}
              >
                Read the plan <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/home"
                onClick={() => track('Meet Jean')}
                className="px-5 py-3 rounded-lg font-semibold border-2 border-[#0E1E4A] dark:border-white/70 bg-background inline-flex items-center gap-2 hover:bg-muted transition"
              >
                View portfolio
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-[#C8102E]/60" />
              <img
                src="/campaign/jean.jpeg"
                alt="Jean de Dieu UWINTWALI"
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full object-cover object-top shadow-xl"
              />
              <div
                className={`absolute -bottom-3 left-1/2 -translate-x-1/2 ${NAVY} ${GOLD_TEXT} font-black px-4 py-1.5 rounded-full text-sm tracking-wider whitespace-nowrap shadow-lg`}
              >
                #VOTEJEAN
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── FOUNDATION ───────────── */}
        <section>
          <SectionLabel>01 · Foundation</SectionLabel>
          <SectionTitle>Building on what the club has achieved</SectionTitle>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            The current leadership has built an active and well-organised club.
            My aim is to continue that work with the new committee and to
            contribute in the four areas described below.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {foundation.map((d, i) => (
              <div key={d.k} className="rounded-xl border bg-card p-5">
                <div className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </div>
                <div className={`mt-1 font-semibold ${HEADING}`}>{d.k}</div>
                <p className="mt-2 text-sm text-muted-foreground">{d.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────── THE ROLE ───────────── */}
        <section>
          <SectionLabel>02 · Mandate</SectionLabel>
          <SectionTitle>Scope of the Strategist role</SectionTitle>
          <div className="mt-8 grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {roleDoes.map(([t, d]) => (
                <div
                  key={t}
                  className="rounded-xl border bg-card p-4 flex gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-emerald-600" />
                  <div>
                    <div className="font-semibold">{t}</div>
                    <div className="text-sm text-muted-foreground">{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={`${NAVY} rounded-xl p-5 text-white`}>
              <div className={`font-semibold mb-3 ${GOLD_TEXT}`}>
                Out of scope
              </div>
              <ul className="space-y-3">
                {roleNot.map(t => (
                  <li key={t} className="flex gap-2 text-sm text-white/85">
                    <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-[#ff5c6f]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────────── PRIORITIES ───────────── */}
        <section id="priorities" className="scroll-mt-24">
          <SectionLabel>03 · Priorities</SectionLabel>
          <SectionTitle>
            As Strategist, I&apos;ll focus on four things
          </SectionTitle>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Each priority comes with a flagship program and a metric. Targets
            are initial estimates. Final targets will be set with the executive
            team after the first member survey.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {priorities.map((p, i) => (
              <article
                key={p.title}
                className="rounded-2xl border bg-card p-6 flex flex-col shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`${NAVY} ${GOLD_TEXT} h-12 w-12 rounded-xl grid place-items-center shrink-0`}
                  >
                    <p.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">
                      P{i + 1}
                    </div>
                    <h3 className={`text-xl font-bold ${HEADING}`}>
                      {p.title}
                    </h3>
                    <div className="mt-1 text-sm text-foreground/80">
                      {p.tagline}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{p.why}</p>
                <div className="mt-4 rounded-lg bg-muted/60 p-4 flex-1">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Flagship program
                  </div>
                  <div className={`font-semibold ${RED_TEXT}`}>{p.program}</div>
                  <p className="mt-1 text-sm">{p.programDetail}</p>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                      Metric
                    </dt>
                    <dd>{p.measure}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                      Initial target
                    </dt>
                    <dd className="font-semibold">{p.target}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        {/* ───────────── FIRST 100 DAYS ───────────── */}
        <section>
          <SectionLabel>04 · Execution</SectionLabel>
          <SectionTitle>First 100 days</SectionTitle>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Three phases. Each ends with a deliverable that members can see.
          </p>
          <ol className="mt-10 grid md:grid-cols-3 gap-5">
            {phases.map((ph, i) => (
              <li
                key={ph.title}
                className="rounded-2xl border bg-card p-6 flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`h-10 w-10 rounded-full grid place-items-center text-white font-bold ${
                      i === 2 ? 'bg-[#C8102E]' : NAVY
                    }`}
                  >
                    {i + 1}
                  </div>
                  <ph.icon className={`h-6 w-6 ${RED_TEXT}`} />
                </div>
                <div className="mt-4 font-mono text-xs text-muted-foreground">
                  {ph.days}
                </div>
                <h3 className={`text-xl font-bold ${HEADING}`}>{ph.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground flex-1">
                  {ph.items.map(it => (
                    <li key={it} className="flex gap-2">
                      <span className={RED_TEXT}>•</span>
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t text-sm">
                  <span className="text-muted-foreground">Deliverable: </span>
                  <span className="font-semibold">{ph.output}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ───────────── ACCOUNTABILITY ───────────── */}
        <section
          id="accountability"
          className={`${NAVY} rounded-3xl p-6 sm:p-10 text-white scroll-mt-24`}
        >
          <div className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#F5D58A]">
            {'// '}05 · Accountability
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
            Reporting progress{' '}
            <span className={GOLD_TEXT}>every two weeks</span>
          </h2>
          <p className="mt-3 text-white/80 font-light max-w-3xl">
            Data comes from attendance logs, the roadmap and member surveys, and
            is shown on a dashboard open to all members. Only aggregate figures
            are published. Individual data is never shared. An end-of-term
            report records what was planned, what was delivered, and what the
            next team should continue.
          </p>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {metrics.map(m => (
              <div
                key={m.label}
                className="rounded-xl bg-white/5 border border-white/10 p-4"
              >
                <BarChart3 className={`h-5 w-5 ${GOLD_TEXT}`} />
                <div className="mt-2 text-3xl font-black">{m.target}</div>
                <div className="text-sm font-semibold">{m.label}</div>
                <div className="text-xs text-white/60">{m.note}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/70">
            Progress is shared openly. If a target needs adjusting, members hear
            it early, with the reason and an updated plan.
          </p>
        </section>

        {/* ───────────── DELIVERY SAFEGUARDS ───────────── */}
        <section>
          <SectionLabel>06 · Delivery</SectionLabel>
          <SectionTitle>Planning for a student term</SectionTitle>
          <div className="mt-8 rounded-2xl border bg-card divide-y">
            {risks.map(([r, m]) => (
              <div
                key={r}
                className="grid sm:grid-cols-3 gap-2 sm:gap-6 p-4 sm:p-5"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldAlert className={`h-4 w-4 shrink-0 ${RED_TEXT}`} />
                  {r}
                </div>
                <div className="sm:col-span-2 text-sm text-muted-foreground">
                  {m}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────── WHY ME ───────────── */}
        <section className="rounded-3xl border-2 border-[#C8102E]/40 bg-card p-6 sm:p-10">
          <SectionLabel>07 · Why me</SectionLabel>
          <SectionTitle>Why I am standing for this role</SectionTitle>
          <div className="mt-6 grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4 text-lg">
              <p>
                The Strategist helps the committee base its decisions on
                evidence, plan realistically and work well with others. My
                studies in data science and my work on software for public
                institutions have given me some practice in each of these, and I
                would like to use that experience in service of the club.
              </p>
              <p className="text-muted-foreground">
                I would rather report progress than make large promises, so I
                intend to share the plan and update members on it regularly. I
                promise to serve our club gracefully and expertly, and to keep
                growing together with each of you.
              </p>
            </div>
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
              {[
                [
                  'Data science training',
                  'I hold a data science certification and have built forecasting and classification models. This work has taught me to look closely at what data can and cannot show before drawing conclusions.',
                ],
                [
                  'Graduate study at CMU-Africa',
                  'I am an MS student in Engineering Artificial Intelligence, where coursework emphasises stating assumptions clearly and testing them.',
                ],
                [
                  'Ministry of Justice, Rwanda',
                  'As a software developer intern, I helped maintain the UPR LC system, which supports human-rights reporting coordination across 72+ institutions. I have also built a full-stack web platform from start to finish.',
                ],
                [
                  'Working with others',
                  'I plan to begin by learning from the outgoing leaders and from members, and then to develop the plan together with the new committee.',
                ],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl bg-muted/60 p-5">
                  <div className={`font-semibold ${HEADING}`}>{t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── CLOSE / CTA ───────────── */}
        <section
          className={`${NAVY} text-center rounded-3xl p-8 sm:p-14 text-white`}
        >
          <div className="text-4xl sm:text-6xl font-black tracking-tight">
            Let&apos;s grow together.
          </div>
          <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            I&apos;d be grateful for your vote, and I&apos;d be just as grateful
            for your ideas. This plan should belong to all of us.
          </p>
          <p className={`mt-4 font-semibold ${GOLD_TEXT}`}>
            Thank you for your time and your trust.
          </p>
          <p className="mt-6 text-sm text-white/70">
            Community of Practice · Gender Inclusion · More Opportunities ·
            Clear Priorities
          </p>
          <p className="mt-2 text-sm text-white/60">
            With thanks to the current leadership for the foundation they have
            built.
          </p>
          <div className="mt-6 inline-flex flex-wrap justify-center gap-4 font-mono text-sm">
            <span className={GOLD_TEXT}>#Inclusion</span>
            <span className={GOLD_TEXT}>#Community</span>
            <span className={GOLD_TEXT}>#Impact</span>
            <span className="font-black text-white">#VOTEJEAN</span>
          </div>
          <div className="mt-8">
            <Link
              href="/home"
              onClick={() => track('CTA portfolio')}
              className="bg-[#C8102E] text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:opacity-90 transition"
            >
              View my work <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Manifesto;
