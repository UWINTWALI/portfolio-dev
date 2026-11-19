import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import {
  CalendarDays,
  Clock,
  MapPin,
  Laptop,
  Hourglass,
  Trophy,
  ArrowRight,
  GraduationCap,
  FlaskConical,
  Users,
  BookOpen,
  Target,
  Award,
} from 'lucide-react';

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;
if (TRACKING_ID) ReactGA.initialize(TRACKING_ID);

/* Same palette as the manifesto */
const NAVY = 'bg-[#0E1E4A]';
const HEADING = 'text-[#0E1E4A] dark:text-white';
const RED_TEXT = 'text-[#C8102E] dark:text-[#ff5c6f]';
const GOLD_TEXT = 'text-[#E8B341]';

const LUMA_URL = 'https://luma.com/b17uczt1?tk=qJy2MF';
const LUMA_EMBED = 'https://luma.com/embed/event/evt-pIvhYAHBnFPlJUU/simple';
const ZINDI_URL = 'https://zindi.africa';
const DATACAMP_URL = 'https://www.datacamp.com';

const details = [
  {
    icon: CalendarDays,
    k: 'Launch & info session',
    v: 'Friday, 20 November 2026',
  },
  { icon: Clock, k: 'Time', v: '5:00 PM – 6:00 PM CAT' },
  {
    icon: MapPin,
    k: 'Venue',
    v: 'Carnegie Mellon University Africa, Kigali, and online',
  },
  {
    icon: Laptop,
    k: 'Online access',
    v: 'The virtual link is shared after registration',
  },
];

const timeline = [
  { icon: Clock, k: 'Challenge opens', v: '20 November 2026' },
  { icon: Hourglass, k: 'Submissions close', v: '27 November 2026, 4:00 PM' },
  { icon: Trophy, k: 'Closing event', v: '27 November 2026, 3:00 PM' },
];

const zindiReasons = [
  {
    icon: FlaskConical,
    t: 'Real problems, real data',
    d: 'Challenges are posed by organisations working on African problems, in areas such as agriculture, health, finance and climate. The data is messy in the way real data is, which is where much of the learning happens.',
  },
  {
    icon: Target,
    t: 'Honest, measurable feedback',
    d: 'Public and private leaderboards show how well a model generalises, not only how well it fits. Few settings teach validation discipline as directly.',
  },
  {
    icon: Users,
    t: 'A community to learn from',
    d: 'Discussion boards and shared solutions let you study how others framed the same problem. Teaming up with classmates turns a challenge into a small research project.',
  },
  {
    icon: Award,
    t: 'A visible record of work',
    d: 'Rankings and finished solutions form a portfolio that recruiters and supervisors can verify, alongside your coursework.',
  },
];

const datacampTips = [
  {
    t: 'Follow a track, not only single courses',
    d: 'Career and skill tracks give a structured path, for example in machine learning, SQL or data engineering, so effort adds up to a coherent skill.',
  },
  {
    t: 'Practise, then build',
    d: 'Use the practice exercises to keep fundamentals sharp, and the projects to apply them to complete datasets from start to finish.',
  },
  {
    t: 'Earn the certifications',
    d: 'Where your access includes them, the certification exams are a credible way to demonstrate proficiency to employers.',
  },
  {
    t: 'Pair it with a challenge',
    d: 'Learn a technique on DataCamp, then apply it the same week on a Zindi problem. Theory and practice reinforce each other.',
  },
];

const Events: NextPage = () => {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/events', title: 'Events' });
  }, []);

  const track = (action: string) =>
    ReactGA.event({ category: 'Events', action });

  return (
    <>
      <Head>
        <title>Upcoming Event · CMU-Africa x Zindi Hackathon</title>
        <meta
          name="description"
          content="CMU-Africa x Zindi Hackathon: launch and info session on 20 November 2026, 5:00 to 6:00 PM CAT, at Carnegie Mellon University Africa and online. Register, practise on Zindi, and make full use of DataCamp."
        />
        <meta
          property="og:image"
          content="/events/cmu-zindi-hackathon-2026.jpg"
        />
      </Head>

      <div className="relative my-8 sm:my-14 space-y-20 sm:space-y-28">
        {/* ───────────── EVENT ───────────── */}
        <section className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3">
            <div
              className={`font-mono text-xs sm:text-sm tracking-[0.25em] uppercase ${RED_TEXT}`}
            >
              {'// '}Upcoming event
            </div>
            <div
              className={`mt-4 text-lg sm:text-xl font-bold tracking-tight ${HEADING}`}
            >
              CMU-Africa × Zindi
            </div>
            <h1
              className={`text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight ${RED_TEXT}`}
            >
              HACKATHON
            </h1>
            <div
              className={`mt-2 inline-block rounded-md bg-muted px-3 py-1 font-semibold tracking-wide ${HEADING}`}
            >
              Launch &amp; Info Session
            </div>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Hosted by Zindi Rwanda with the CMU-Africa Data Science Club and
              the CMU Research Club. A week-long challenge to apply what we
              study to a real problem, in teams or individually.
            </p>
            <p className="mt-3 text-base text-muted-foreground font-light max-w-xl">
              Whether you are taking your first steps in machine learning or
              already compete regularly, this is a rare opportunity to learn by
              doing, alongside classmates, with a clear deadline and an
              objective measure of progress. I warmly encourage you to take
              part.
            </p>

            <dl className="mt-8 grid sm:grid-cols-2 gap-3">
              {details.map(d => (
                <div
                  key={d.k}
                  className="rounded-xl border bg-card p-4 flex gap-3"
                >
                  <d.icon className={`h-5 w-5 mt-0.5 shrink-0 ${RED_TEXT}`} />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                      {d.k}
                    </dt>
                    <dd className="font-semibold">{d.v}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <ol className="mt-6 rounded-2xl border bg-card divide-y">
              {timeline.map(t => (
                <li key={t.k} className="flex items-center gap-3 p-4">
                  <span
                    className={`${NAVY} ${GOLD_TEXT} h-9 w-9 rounded-full grid place-items-center shrink-0`}
                  >
                    <t.icon className="h-4 w-4" />
                  </span>
                  <span className="font-semibold">{t.k}</span>
                  <span className="ml-auto text-sm text-muted-foreground text-right">
                    {t.v}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={LUMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('Register Luma')}
                className="bg-[#C8102E] text-white px-5 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:opacity-90 transition shadow-[0_5px_0_0_#0E1E4A] dark:shadow-[0_5px_0_0_#E8B341]"
              >
                Register now <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#zindi"
                onClick={() => track('Why Zindi')}
                className="px-5 py-3 rounded-lg font-semibold border-2 border-[#0E1E4A] dark:border-white/70 bg-background inline-flex items-center gap-2 hover:bg-muted transition"
              >
                How to prepare
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <a
              href={LUMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('Banner click')}
              className="block"
            >
              <img
                src="/events/cmu-zindi-hackathon-2026.jpg"
                alt="CMU-Africa x Zindi Hackathon launch and info session: Friday 20 November 2026, 5:00 PM to 6:00 PM CAT, at CMU-Africa and online. Challenge opens 20 November; submissions close 27 November at 4 PM."
                width={1131}
                height={1600}
                className="w-full h-auto rounded-2xl border shadow-xl hover:shadow-2xl transition"
              />
            </a>
          </div>
        </section>

        {/* ───────────── REGISTRATION (Luma embed) ───────────── */}
        <section>
          <div
            className={`font-mono text-xs sm:text-sm tracking-[0.25em] uppercase ${RED_TEXT}`}
          >
            {'// '}Registration
          </div>
          <h2 className={`mt-3 text-3xl sm:text-4xl font-bold ${HEADING}`}>
            Reserve your place
          </h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Registration takes less than a minute. The link to join online is
            sent to registered participants before the session begins.
          </p>
          <div className="mt-8 rounded-2xl border bg-card overflow-hidden">
            <iframe
              src={LUMA_EMBED}
              title="Register for the CMU-Africa x Zindi Hackathon on Luma"
              className="w-full h-[450px] border-0"
              allow="fullscreen; payment"
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            If the form does not load,{' '}
            <a
              href={LUMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('Register fallback')}
              className={`font-semibold underline ${RED_TEXT}`}
            >
              register directly on Luma
            </a>
            .
          </p>
        </section>

        {/* ───────────── ZINDI ───────────── */}
        <section id="zindi" className="scroll-mt-24">
          <div
            className={`font-mono text-xs sm:text-sm tracking-[0.25em] uppercase ${RED_TEXT}`}
          >
            {'// '}Beyond the hackathon
          </div>
          <h2 className={`mt-3 text-3xl sm:text-4xl font-bold ${HEADING}`}>
            Make Zindi your playground
          </h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Zindi is Africa&apos;s largest community of data scientists, and its
            challenges are built around problems that matter on our continent. I
            would encourage every member to create an account and treat it as a
            standing practice ground: a place to test ideas from class, make
            mistakes safely, and measure improvement over time. The hackathon is
            an ideal first step, but the habit is what compounds.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {zindiReasons.map(r => (
              <div
                key={r.t}
                className="rounded-xl border bg-card p-5 flex gap-4"
              >
                <div
                  className={`${NAVY} ${GOLD_TEXT} h-11 w-11 rounded-xl grid place-items-center shrink-0`}
                >
                  <r.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className={`font-semibold ${HEADING}`}>{r.t}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <a
              href={ZINDI_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('Join Zindi')}
              className={`${NAVY} text-white px-5 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:opacity-90 transition`}
            >
              <Trophy className="h-4 w-4" /> Join Zindi{' '}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* ───────────── DATACAMP ───────────── */}
        <section className={`${NAVY} rounded-3xl p-6 sm:p-10 text-white`}>
          <div className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#F5D58A]">
            {'// '}Learning resources
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
            Have DataCamp access?{' '}
            <span className={GOLD_TEXT}>Use it to the fullest.</span>
          </h2>
          <p className="mt-3 text-white/80 font-light max-w-3xl">
            If you have been given DataCamp access, it is one of the most
            valuable resources available to you, and access of this kind is
            often time-limited. A steady routine, even thirty minutes a few
            times a week, goes much further than an occasional long session.
            Some suggestions for making the most of it:
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {datacampTips.map((tip, i) => (
              <div key={tip.t} className="rounded-xl bg-white/10 p-5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#F5D58A]">
                    0{i + 1}
                  </span>
                  <span className="font-semibold">{tip.t}</span>
                </div>
                <p className="mt-2 text-sm text-white/80">{tip.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={DATACAMP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('Open DataCamp')}
              className="bg-[#C8102E] text-white px-5 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:opacity-90 transition"
            >
              <BookOpen className="h-4 w-4" /> Continue learning on DataCamp
            </a>
            <span className="text-sm text-white/70 inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Learn on DataCamp, practise on Zindi.
            </span>
          </div>
        </section>
      </div>
    </>
  );
};

export default Events;
