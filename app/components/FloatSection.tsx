"use client";

import Reveal from "./ui/Reveal";
import AnimatedNumber from "./ui/AnimatedNumber";

export default function FloatSection() {
  return (
    <section id="float" className="section-pad relative overflow-hidden bg-ink text-paper">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 0%, rgba(194,154,76,0.16) 0%, rgba(12,27,42,0) 55%)",
        }}
        aria-hidden
      />
      <div className="container-wide relative">
        <Reveal className="container-prose">
          <p className="eyebrow-light">The hidden engine</p>
          <h2 className="display mt-4 text-balance text-4xl text-paper sm:text-5xl">
            The most valuable thing on the page isn&rsquo;t on the page.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-paper/75">
            Buckeye collects premium today and pays most claims years from now. In
            between, it&rsquo;s holding a mountain of other people&rsquo;s money &mdash;
            and it gets to invest it. That pool is called the{" "}
            <strong className="font-semibold text-gold">float</strong>, and it&rsquo;s the
            quiet force behind nearly every great insurance fortune.
          </p>
        </Reveal>

        {/* timeline visual */}
        <Reveal className="mx-auto mt-14 max-w-4xl rounded-2xl border border-line-dark bg-ink-2/50 p-6 sm:p-9" delay={80}>
          <FloatTimeline />
        </Reveal>

        {/* the three truths */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
          <Reveal delay={0}>
            <Truth
              stat={<AnimatedNumber value={1.3} format={(v) => `$${v.toFixed(2)}B`} />}
              label="Buckeye's float"
              body="Roughly 1.3× a full year of earned premium — money held now, owed later."
            />
          </Reveal>
          <Reveal delay={80}>
            <Truth
              stat="< 100%"
              label="The magic threshold"
              body="Underwrite below a 100% combined ratio and you're effectively paid to hold the float. The money costs less than free."
            />
          </Reveal>
          <Reveal delay={160}>
            <Truth
              stat="years"
              label="Time, compounding"
              body="The longer the claims take to settle, the longer the float works for you. This is the whole machine."
            />
          </Reveal>
        </div>

        <Reveal className="container-prose mt-14 border-l-2 border-gold pl-6">
          <p className="font-serif text-2xl leading-snug text-paper sm:text-[1.65rem]">
            &ldquo;Insurers receive the premiums up front and pay the claims later&hellip;
            this collect-now, pay-later model leaves us holding large sums &mdash; float
            &mdash; that will eventually go to others.&rdquo;
          </p>
          <p className="mt-4 text-sm text-paper/55">
            &mdash; The principle Warren Buffett built Berkshire Hathaway on. It&rsquo;s why
            insurance balance sheets reward patience.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Truth({ stat, label, body }: { stat: React.ReactNode; label: string; body: string }) {
  return (
    <div className="h-full rounded-2xl border border-line-dark bg-ink-2/40 p-6">
      <p className="tnum font-serif text-4xl font-semibold text-gold">{stat}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-paper/55">{label}</p>
      <p className="mt-4 text-sm leading-relaxed text-paper/75">{body}</p>
    </div>
  );
}

function FloatTimeline() {
  return (
    <svg viewBox="0 0 680 220" className="w-full" role="img" aria-label="How the float works over time">
      {/* time axis */}
      <line x1="40" y1="150" x2="640" y2="150" stroke="#23384C" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5].map((yr) => {
        const x = 60 + yr * 112;
        return (
          <g key={yr}>
            <line x1={x} y1="146" x2={x} y2="154" stroke="#5b6e80" strokeWidth="1.5" />
            <text x={x} y="172" textAnchor="middle" fontSize="11" fill="#6B7C8C" className="font-mono">
              Yr {yr}
            </text>
          </g>
        );
      })}

      {/* the float band */}
      <defs>
        <linearGradient id="floatGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C29A4C" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#9A7530" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect x="60" y="92" width="510" height="40" rx="8" fill="url(#floatGrad)" />
      <text x="315" y="117" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0C1B2A">
        FLOAT · invested while you hold it
      </text>

      {/* investment-return sparks above the band */}
      {[140, 250, 360, 470].map((x, i) => (
        <g key={x} opacity={0.9}>
          <line x1={x} y1="86" x2={x} y2="64" stroke="#1AA17F" strokeWidth="2" />
          <path d={`M${x - 4} 70 L${x} 62 L${x + 4} 70`} fill="none" stroke="#1AA17F" strokeWidth="2" />
          {i === 3 && (
            <text x={x + 12} y="62" fontSize="11" fill="#1AA17F" className="font-mono">
              + investment return
            </text>
          )}
        </g>
      ))}

      {/* premium in (left) */}
      <g>
        <path d="M60 60 L60 88" stroke="#1AA17F" strokeWidth="2.5" />
        <path d="M54 80 L60 90 L66 80" fill="none" stroke="#1AA17F" strokeWidth="2.5" />
        <text x="60" y="50" textAnchor="middle" fontSize="12" fontWeight="700" fill="#FAF8F3">
          Premium in
        </text>
        <text x="60" y="38" textAnchor="middle" fontSize="10" fill="#6B7C8C">
          today
        </text>
      </g>

      {/* claims out (right) */}
      <g>
        <path d="M570 132 L570 104" stroke="#D9694F" strokeWidth="2.5" />
        <path d="M564 112 L570 102 L576 112" fill="none" stroke="#D9694F" strokeWidth="2.5" />
        <text x="595" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill="#FAF8F3">
          Claims out
        </text>
        <text x="595" y="138" textAnchor="middle" fontSize="10" fill="#6B7C8C">
          years later
        </text>
      </g>
    </svg>
  );
}
