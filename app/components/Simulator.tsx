"use client";

import { useMemo, useState } from "react";
import {
  PRESETS,
  SIM_DEFAULTS,
  simulate,
  type SimInputs,
  type Verdict,
} from "@/app/lib/insurer";
import { millions, pct } from "@/app/lib/format";
import CombinedRatioBar from "./ui/CombinedRatioBar";
import Waterfall from "./ui/Waterfall";
import Reveal from "./ui/Reveal";

const signedMoney = (v: number) => `${v < 0 ? "−" : ""}$${millions(Math.abs(v))}M`;

function sameInputs(a: SimInputs, b: SimInputs) {
  return (
    a.nep === b.nep &&
    a.lossRatio === b.lossRatio &&
    a.expenseRatio === b.expenseRatio &&
    a.floatMultiple === b.floatMultiple &&
    a.yield === b.yield
  );
}

export default function Simulator() {
  const [inputs, setInputs] = useState<SimInputs>({ ...SIM_DEFAULTS });
  const result = useMemo(() => simulate(inputs), [inputs]);

  const set = (patch: Partial<SimInputs>) => setInputs((prev) => ({ ...prev, ...patch }));

  return (
    <section id="simulator" className="section-pad bg-ink text-paper">
      <div className="container-wide">
        <Reveal className="container-prose">
          <p className="eyebrow-light">Your turn</p>
          <h2 className="display mt-4 text-balance text-4xl text-paper sm:text-5xl">
            Run {`Buckeye Mutual`} yourself.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-paper/75">
            Drag the dials and watch the two engines fight it out. Push the combined
            ratio past 100% and see whether the float can bail you out.
          </p>
        </Reveal>

        {/* presets */}
        <Reveal className="mt-10 flex flex-wrap gap-2.5" delay={60}>
          {PRESETS.map((p) => {
            const active = sameInputs(p.inputs, inputs);
            return (
              <button
                key={p.id}
                onClick={() => setInputs({ ...p.inputs })}
                className={[
                  "group rounded-full border px-4 py-2 text-sm font-medium transition",
                  active
                    ? "border-gold bg-gold text-ink"
                    : "border-line-dark bg-ink-2/40 text-paper/80 hover:border-gold/60 hover:text-paper",
                ].join(" ")}
                title={p.blurb}
              >
                {p.name}
              </button>
            );
          })}
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* controls */}
          <div className="rounded-2xl border border-line-dark bg-ink-2/40 p-6 sm:p-7">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-paper/55">The dials</h3>
            <div className="mt-6 space-y-7">
              <Slider
                label="Loss & LAE ratio"
                hint="claims as a share of premium"
                value={inputs.lossRatio}
                min={40}
                max={115}
                step={0.1}
                suffix="%"
                decimals={1}
                onChange={(v) => set({ lossRatio: v })}
              />
              <Slider
                label="Expense ratio"
                hint="commissions + overhead"
                value={inputs.expenseRatio}
                min={20}
                max={45}
                step={0.1}
                suffix="%"
                decimals={1}
                onChange={(v) => set({ expenseRatio: v })}
              />
              <Slider
                label="Float"
                hint="multiple of earned premium"
                value={inputs.floatMultiple}
                min={0.5}
                max={2.5}
                step={0.1}
                suffix="×"
                decimals={1}
                onChange={(v) => set({ floatMultiple: v })}
              />
              <Slider
                label="Investment yield"
                hint="annual return on the float"
                value={inputs.yield}
                min={0}
                max={8}
                step={0.1}
                suffix="%"
                decimals={1}
                onChange={(v) => set({ yield: v })}
              />
            </div>
            <p className="mt-7 border-t border-line-dark pt-4 text-xs leading-relaxed text-paper/45">
              Earned premium fixed at ${millions(inputs.nep, 0)}M. Simplified model: investment
              income = float × yield, taxed at a flat 21%. The real statement also carries
              realized gains and interest expense.
            </p>
          </div>

          {/* results */}
          <div className="rounded-2xl border border-gold/25 bg-paper p-6 text-ink shadow-card sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
                  Combined ratio
                </p>
                <p
                  className={[
                    "tnum font-serif text-6xl font-semibold leading-none",
                    result.combinedRatio <= 100 ? "text-profit" : "text-loss",
                  ].join(" ")}
                >
                  {pct(result.combinedRatio)}
                </p>
              </div>
              <p className="tnum text-right text-sm text-ink-soft">
                Net income
                <br />
                <span
                  className={[
                    "font-serif text-3xl font-semibold",
                    result.netIncome >= 0 ? "text-ink" : "text-loss",
                  ].join(" ")}
                >
                  {signedMoney(result.netIncome)}
                </span>
              </p>
            </div>

            <div className="mt-6">
              <CombinedRatioBar
                lossRatio={inputs.lossRatio}
                expenseRatio={inputs.expenseRatio}
                height={56}
                legend={false}
              />
            </div>

            {/* key figures */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <Figure label="Underwriting" value={result.underwriting} tag="engine #1" />
              <Figure label="Investments" value={result.investmentIncome} tag="engine #2" forcePositive />
              <Figure label="Net income" value={result.netIncome} tag="bottom line" bold />
            </div>

            {/* verdict */}
            <VerdictBanner v={result.verdict} />

            {/* waterfall */}
            <div className="mt-6 border-t border-line pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
                Profit bridge
              </p>
              <div className="mt-2">
                <Waterfall result={result} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  suffix,
  decimals = 0,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  decimals?: number;
  onChange: (v: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-sm font-semibold text-paper">{label}</span>
          <span className="ml-2 text-xs text-paper/45">{hint}</span>
        </div>
        <span className="tnum font-mono text-base font-semibold text-gold">
          {value.toFixed(decimals)}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        className="slider mt-3"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          background: `linear-gradient(90deg, #C29A4C 0%, #C29A4C ${fill}%, #23384C ${fill}%, #23384C 100%)`,
        }}
        aria-label={label}
      />
    </div>
  );
}

function Figure({
  label,
  value,
  tag,
  bold,
  forcePositive,
}: {
  label: string;
  value: number;
  tag: string;
  bold?: boolean;
  forcePositive?: boolean;
}) {
  const positive = forcePositive || value >= 0;
  return (
    <div className="rounded-xl border border-line bg-paper-2 px-3 py-3 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p
        className={[
          "tnum mt-1 font-mono tabular-nums",
          bold ? "text-lg font-bold" : "text-base font-semibold",
          positive ? "text-ink" : "text-loss",
        ].join(" ")}
      >
        {signedMoney(value)}
      </p>
      <p className="mt-0.5 text-[9px] uppercase tracking-wider text-gold-deep">{tag}</p>
    </div>
  );
}

function VerdictBanner({ v }: { v: Verdict }) {
  const tone = {
    great: "border-profit/40 bg-profit/[0.08] text-profit",
    good: "border-profit/30 bg-profit/[0.06] text-profit",
    warn: "border-gold/40 bg-gold/[0.10] text-gold-deep",
    bad: "border-loss/40 bg-loss/[0.08] text-loss",
  }[v.tone];

  return (
    <div className={`mt-6 rounded-xl border p-4 ${tone}`}>
      <p className="text-sm font-bold">{v.headline}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{v.detail}</p>
    </div>
  );
}
