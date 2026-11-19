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
  ArrowRight,
  ShieldAlert,
  MessageCircleQuestion,
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
    tagline: 'Learning from each other regularly, not only at big events.',
    why: 'Many of us are working on interesting projects. Sharing them more often would help everyone learn, and keeping the material in one place would help the next team too.',
    program: 'Data Circles',
    programDetail:
      'Small, informal sessions where a member shows a project, paper or tool they have been working on. A shared folder where useful notebooks and resources are kept.',
  },
  {
    icon: Users,
    title: 'Gender Inclusion',
    tagline: 'Making sure everyone feels welcome to take part.',
    why: 'Inclusion is not only about who attends. It is also about who gets the chance to present and lead.',
    program: 'Women in Data',
    programDetail:
      'Invite women practitioners and alumni to share their experience. Encourage more women members to present and facilitate. Keep a simple, anonymous way for members to give feedback.',
  },
  {
    icon: TrendingUp,
    title: 'More Opportunities',
    tagline: 'Helping members find opportunities beyond the classroom.',
    why: 'Many members hope the club can help them hear about internships, competitions and applied projects. This would build on the connections the club already has.',
    program: 'Opportunity Board',
    programDetail:
      'Collect and share internships, competitions, datasets and scholarships in one place. Support members who want to form teams for data competitions. Invite alumni to talk about their career paths.',
  },
  {
    icon: Target,
    title: 'Clear Priorities',
    tagline: 'Agreeing early on what matters most this term.',
    why: 'A new committee has many good ideas and limited time. A short, shared plan can help us focus, and ideas that do not fit this term can be kept for later.',
    program: 'Shared Roadmap',
    programDetail:
      'A short term plan agreed with the executive team and shared with members. Regular check-ins on how it is going, and a brief summary at the end of the term.',
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
    ],
  },
  {
    icon: Compass,
    days: 'Days 31–60',
    title: 'Plan together',
    items: [
      'A simple term plan built around the four priorities',
      'Strategy workshop with the new committee to agree it',
      'Roadmap: programs, dates, owners, around the exam calendar',
    ],
  },
  {
    icon: Rocket,
    days: 'Days 61–100',
    title: 'Deliver & measure',
    items: [
      'Launch the first program under each priority',
      'Mid-term review to refine each program',
    ],
  },
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

          <div className="lg:col-span-2 order-1 lg:order-2 flex flex-col items-center gap-10">
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
            <Link
              href={{
                pathname: '/assistant',
                query: {
                  q: 'Why is Jean de Dieu a credible candidate for Strategist?',
                },
              }}
              onClick={() => track('Hero ask assistant')}
              className="group relative inline-flex items-center gap-3 rounded-full bg-[#C8102E] text-white pl-3 pr-5 py-2.5 font-semibold shadow-[0_5px_0_0_#0E1E4A] dark:shadow-[0_5px_0_0_#E8B341] hover:-translate-y-0.5 transition"
            >
              <span className="absolute inset-0 rounded-full bg-[#C8102E] opacity-40 animate-ping motion-reduce:hidden" />
              <span className="relative grid place-items-center h-8 w-8 rounded-full bg-white/15">
                <MessageCircleQuestion className="h-5 w-5" />
              </span>
              <span className="relative leading-tight text-left">
                <span className="block">Ask my assistant</span>
                <span className="block text-xs font-normal text-white/80">
                  Why should you trust me?
                </span>
              </span>
              <ArrowRight className="relative h-4 w-4 group-hover:translate-x-0.5 transition" />
            </Link>
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
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {roleDoes.map(([t, d]) => (
              <div key={t} className="rounded-xl border bg-card p-4 flex gap-3">
                <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-emerald-600" />
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────── PRIORITIES ───────────── */}
        <section id="priorities" className="scroll-mt-24">
          <SectionLabel>03 · Priorities</SectionLabel>
          <SectionTitle>
            As Strategist, I&apos;ll focus on four things
          </SectionTitle>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            These are ideas I would bring to the executive team. The details
            would be decided together, based on what members need and what we
            can realistically do in one term.
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
                    What I would propose
                  </div>
                  <div className={`font-semibold ${RED_TEXT}`}>{p.program}</div>
                  <p className="mt-1 text-sm">{p.programDetail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ───────────── FIRST 100 DAYS ───────────── */}
        <section>
          <SectionLabel>04 · Execution</SectionLabel>
          <SectionTitle>First 100 days</SectionTitle>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Three phases: listen first, plan together, then deliver.
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
            Members will regularly hear what is moving forward, what is harder
            than expected, and why. Updates will be short and honest.
          </p>
          <p className="mt-4 text-white/80 font-light max-w-3xl">
            If plans need to change, members will know early. At the end of the
            term, a brief report will set out what we achieved and what the next
            team can build on.
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
