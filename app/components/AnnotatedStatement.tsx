"use client";

import { useEffect, useRef, useState } from "react";
import { annotations, buckeye, statement, type StatementLine } from "@/app/lib/insurer";
import { accounting } from "@/app/lib/format";

export default function AnnotatedStatement() {
  const [activeId, setActiveId] = useState<string>(annotations[0].id);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).dataset.id;
            if (id) setActiveId(id);
          }
        });
      },
      // active band = middle ~12% of the viewport
      { rootMargin: "-44% 0px -44% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="statement" className="section-pad bg-paper-2">
      <div className="container-wide">
        <div className="container-prose">
          <p className="eyebrow">The statement, line by line</p>
          <h2 className="display mt-4 text-balance text-4xl text-ink sm:text-5xl">
            Read {buckeye.name}&rsquo;s income statement
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-soft">
            Here is a full-year P&amp;L for our fictional insurer. Scroll, and each
            line lights up with what it really means &mdash; and why it matters.
          </p>
        </div>

        {/* ── Desktop: sticky ledger + scrolling annotations ── */}
        <div className="mt-14 hidden md:grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] md:gap-10 lg:gap-16">
          <div className="relative">
            <div className="sticky top-[10vh]">
              <Ledger activeId={activeId} />
            </div>
          </div>

          <div>
            {annotations.map((a, i) => (
              <div
                key={a.id}
                data-id={a.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="flex min-h-[46vh] flex-col justify-center py-8"
              >
                <div
                  className="transition-all duration-500"
                  style={{
                    opacity: activeId === a.id ? 1 : 0.32,
                    filter: activeId === a.id ? "none" : "saturate(0.6)",
                  }}
                >
                  <StepBody a={a} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile: self-contained cards ── */}
        <div className="mt-12 space-y-5 md:hidden">
          {annotations.map((a) => {
            const line = statement.find((l) => l.id === a.id)!;
            return (
              <div key={a.id} className="rounded-2xl border border-line bg-paper p-6 shadow-card">
                <MiniLine line={line} />
                <div className="mt-5">
                  <StepBody a={a} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── The ledger card ─────────────────────────────────────────────────────────
function Ledger({ activeId }: { activeId: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-card">
      <div className="flex items-center justify-between border-b border-line bg-ink px-6 py-4 text-paper">
        <div>
          <p className="text-sm font-semibold tracking-wide">{buckeye.name}</p>
          <p className="text-xs text-paper/60">Statement of operations · {buckeye.fy}</p>
        </div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-paper/50">$ millions</p>
      </div>
      <div className="px-3 py-2 sm:px-4">
        {statement.map((line) => (
          <LedgerRow key={line.id} line={line} active={line.id === activeId} />
        ))}
      </div>
    </div>
  );
}

function LedgerRow({ line, active }: { line: StatementLine; active: boolean }) {
  const isTotal = line.tone === "total";
  const isSub = line.tone === "subtotal";
  const emphasized = isTotal || isSub;

  const valueColor =
    line.tone === "negative"
      ? "text-ink-soft"
      : line.tone === "positive"
        ? "text-profit"
        : isTotal
          ? "text-ink"
          : "text-ink";

  return (
    <div
      className={[
        "relative flex items-center justify-between rounded-lg px-3 py-[7px] transition-colors duration-300",
        emphasized ? "mt-0.5 border-t border-line" : "",
        active ? "bg-gold/12 ring-1 ring-gold/40" : "",
      ].join(" ")}
    >
      {active && <span className="absolute -left-1 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-gold" />}
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={[
            "truncate text-[13.5px]",
            emphasized ? "font-semibold text-ink" : "pl-2 text-ink-soft",
            line.tone === "total" ? "text-[15px]" : "",
          ].join(" ")}
        >
          {line.label}
        </span>
        {line.tag && (
          <span className="hidden shrink-0 rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-gold-deep lg:inline">
            {line.tag}
          </span>
        )}
      </div>
      <span
        className={[
          "tnum shrink-0 pl-3 text-[13.5px] tabular-nums",
          valueColor,
          emphasized ? "font-semibold" : "",
          isTotal ? "text-base font-bold" : "",
        ].join(" ")}
      >
        {accounting(line.value)}
      </span>
    </div>
  );
}

function MiniLine({ line }: { line: StatementLine }) {
  const valueColor =
    line.tone === "negative"
      ? "text-ink-soft"
      : line.tone === "positive"
        ? "text-profit"
        : "text-ink";
  return (
    <div className="flex items-center justify-between rounded-lg bg-paper-2 px-4 py-3">
      <span className="text-sm font-semibold text-ink">{line.label}</span>
      <span className={`tnum text-sm font-semibold tabular-nums ${valueColor}`}>
        {accounting(line.value)}
        <span className="ml-1 text-xs font-normal text-muted">$M</span>
      </span>
    </div>
  );
}

// ── A single annotation block ───────────────────────────────────────────────
function StepBody({ a }: { a: (typeof annotations)[number] }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="tnum font-serif text-2xl font-semibold text-gold">{a.step}</span>
        <span className="h-px w-8 bg-gold/50" />
      </div>
      <h3 className="display mt-3 text-2xl text-ink sm:text-[1.7rem]">{a.title}</h3>
      <p className="mt-3 text-pretty leading-relaxed text-ink-soft">{a.body}</p>
      {a.formula && (
        <p className="tnum mt-4 inline-block rounded-lg border border-line bg-paper px-3 py-1.5 font-mono text-[13px] text-ink">
          {a.formula}
        </p>
      )}
      {a.takeaway && (
        <p className="mt-4 flex gap-2 text-[15px] font-medium text-ink">
          <span className="text-gold">→</span>
          <span>{a.takeaway}</span>
        </p>
      )}
    </div>
  );
}
