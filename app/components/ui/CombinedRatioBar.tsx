"use client";

import { useEffect, useState } from "react";
import { pct, round } from "@/app/lib/format";

interface Props {
  lossRatio: number;
  expenseRatio: number;
  /** Show the loss/expense legend beneath the bar. */
  legend?: boolean;
  height?: number;
}

/**
 * The single most important picture in insurance: loss ratio + expense ratio
 * stacked against the 100% break-even line. The whole bar turns green below
 * 100% (underwriting profit) and red above it (underwriting loss).
 */
export default function CombinedRatioBar({
  lossRatio,
  expenseRatio,
  legend = true,
  height = 56,
}: Props) {
  const combined = round(lossRatio + expenseRatio);
  const profitable = combined <= 100;

  // Adaptive scale that always keeps the 100% line comfortably on screen.
  const maxScale = Math.max(120, Math.ceil((combined + 14) / 10) * 10);
  const toPct = (v: number) => `${(v / maxScale) * 100}%`;

  // Animate widths from 0 on mount and between values when props change.
  const [w, setW] = useState({ loss: 0, exp: 0 });
  useEffect(() => {
    const id = requestAnimationFrame(() => setW({ loss: lossRatio, exp: expenseRatio }));
    return () => cancelAnimationFrame(id);
  }, [lossRatio, expenseRatio]);

  const lossColor = profitable ? "#15876A" : "#C24E3A";
  const expColor = profitable ? "#1AA17F" : "#D9694F";

  return (
    <div className="w-full">
      <div className="relative pt-6">
        {/* break-even marker, centered above the line — never clips, never
            collides with the in-bar segment labels */}
        <div
          className="pointer-events-none absolute top-0 z-20 flex -translate-x-1/2 flex-col items-center"
          style={{ left: toPct(100) }}
        >
          <span className="whitespace-nowrap rounded bg-ink px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-paper">
            100% break-even
          </span>
          <span className="h-1.5 w-px bg-ink" />
        </div>
        <div
          className="relative w-full overflow-hidden rounded-xl border border-line bg-paper-2"
          style={{ height }}
        >
        {/* good / bad background zones */}
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: toPct(100), background: "rgba(21,135,106,0.07)" }}
        />
        <div
          className="absolute inset-y-0"
          style={{
            left: toPct(100),
            right: 0,
            background:
              "repeating-linear-gradient(45deg, rgba(194,78,58,0.10) 0 8px, rgba(194,78,58,0.04) 8px 16px)",
          }}
        />

        {/* stacked bar — container is full-width (inset-0) so the segments'
            percentage widths resolve against the track, not a collapsed box */}
        <div className="absolute inset-0 flex items-stretch">
          <div
            className="flex shrink-0 items-center justify-end overflow-hidden transition-[width,background] duration-700 ease-out"
            style={{ width: toPct(w.loss), background: lossColor }}
          >
            {w.loss / maxScale > 0.18 && (
              <span className="tnum px-3 text-xs font-semibold text-white/95">
                Losses {pct(lossRatio)}
              </span>
            )}
          </div>
          <div
            className="flex shrink-0 items-center justify-end overflow-hidden transition-[width,background] duration-700 ease-out"
            style={{ width: toPct(w.exp), background: expColor }}
          >
            {w.exp / maxScale > 0.16 && (
              <span className="tnum px-3 text-xs font-semibold text-white/95">
                Expenses {pct(expenseRatio)}
              </span>
            )}
          </div>
        </div>

        {/* the 100% break-even line (label rendered above the bar) */}
        <div className="absolute inset-y-0 z-10 w-px bg-ink" style={{ left: toPct(100) }} />
        </div>
      </div>

      {legend && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm">
          <div className="flex items-center gap-4">
            <Dot color={lossColor} label="Loss & LAE ratio" />
            <Dot color={expColor} label="Expense ratio" />
          </div>
          <p className="tnum text-ink-soft">
            <span className={profitable ? "font-semibold text-profit" : "font-semibold text-loss"}>
              {profitable ? `${pct(round(100 - combined))} underwriting profit` : `${pct(round(combined - 100))} underwriting loss`}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

function Dot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-ink-soft">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
