"use client";

import { combinedRatio, expenseRatio, lossRatio, uwMargin } from "@/app/lib/insurer";
import { pct } from "@/app/lib/format";
import Reveal from "./ui/Reveal";
import AnimatedNumber from "./ui/AnimatedNumber";
import CombinedRatioBar from "./ui/CombinedRatioBar";

export default function Ratios() {
  return (
    <section id="combined-ratio" className="section-pad bg-paper paper-grain">
      <div className="container-wide">
        <Reveal className="container-prose text-center">
          <p className="eyebrow">The scoreboard</p>
          <h2 className="display mt-4 text-balance text-4xl text-ink sm:text-5xl">
            One number runs the whole industry.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-soft">
            Convert the dollars into cents-on-the-premium-dollar and you get the
            ratios every insurance professional lives by. Add two of them together
            and you get the headline of headlines: the{" "}
            <strong className="font-semibold text-ink">combined ratio</strong>.
          </p>
        </Reveal>

        {/* three ratio cards */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-3">
          <Reveal delay={0}>
            <RatioCard
              label="Loss & LAE ratio"
              value={lossRatio}
              sub="of every premium dollar goes to claims and settling them"
            />
          </Reveal>
          <Reveal delay={80}>
            <RatioCard
              label="Expense ratio"
              value={expenseRatio}
              sub="goes to commissions and the cost of running the company"
            />
          </Reveal>
          <Reveal delay={160}>
            <RatioCard label="Combined ratio" value={combinedRatio} highlight sub="the two, added together" />
          </Reveal>
        </div>

        {/* the 100% line */}
        <Reveal className="mx-auto mt-16 max-w-4xl rounded-2xl border border-line bg-paper p-7 shadow-card sm:p-9">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="display text-2xl text-ink">Mind the 100% line</h3>
            <p className="tnum text-sm text-ink-soft">
              Buckeye sits at <strong className="font-semibold text-profit">{pct(combinedRatio)}</strong> &mdash;{" "}
              {pct(uwMargin)} of profit baked in before investing a dollar.
            </p>
          </div>
          <div className="mt-7">
            <CombinedRatioBar lossRatio={lossRatio} expenseRatio={expenseRatio} height={64} />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Verdict
              tone="good"
              title="Below 100% → underwriting profit"
              body="The insurance made money on its own. Every dollar of investment income is gravy. This is the goal."
            />
            <Verdict
              tone="bad"
              title="Above 100% → underwriting loss"
              body="The insurance lost money. The company can still be profitable, but only if investment income covers the gap."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RatioCard({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: number;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "h-full rounded-2xl border p-6 shadow-card",
        highlight ? "border-gold/50 bg-ink text-paper" : "border-line bg-paper",
      ].join(" ")}
    >
      <p
        className={[
          "text-xs font-semibold uppercase tracking-[0.16em]",
          highlight ? "text-gold" : "text-gold-deep",
        ].join(" ")}
      >
        {label}
      </p>
      <p className={`tnum mt-3 font-serif text-5xl font-semibold ${highlight ? "text-paper" : "text-ink"}`}>
        <AnimatedNumber value={value} format={(v) => pct(v)} />
      </p>
      <p className={`mt-3 text-sm leading-relaxed ${highlight ? "text-paper/70" : "text-ink-soft"}`}>{sub}</p>
    </div>
  );
}

function Verdict({ tone, title, body }: { tone: "good" | "bad"; title: string; body: string }) {
  const isGood = tone === "good";
  return (
    <div
      className={[
        "rounded-xl border p-5",
        isGood ? "border-profit/30 bg-profit/[0.06]" : "border-loss/30 bg-loss/[0.06]",
      ].join(" ")}
    >
      <p className={`text-sm font-semibold ${isGood ? "text-profit" : "text-loss"}`}>{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}
