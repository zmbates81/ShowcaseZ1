"use client";

import type { SimResult } from "@/app/lib/insurer";

interface Props {
  result: SimResult;
}

/**
 * A profit-bridge waterfall for the simulator:
 *   Underwriting result → + Investment income → − Tax → Net income.
 * It makes the "two engines" story visible — and when underwriting is negative,
 * you can literally watch investment income climb the bar back toward zero.
 */
export default function Waterfall({ result }: Props) {
  const { underwriting, investmentIncome, tax, netIncome } = result;
  const preTax = underwriting + investmentIncome;

  type Step = { label: string; type: "total" | "up" | "down"; start: number; end: number; value: number };
  const steps: Step[] = [
    { label: "Underwriting", type: "total", start: 0, end: underwriting, value: underwriting },
    { label: "+ Investments", type: "up", start: underwriting, end: preTax, value: investmentIncome },
    { label: "Tax", type: "down", start: preTax, end: netIncome, value: -tax },
    { label: "Net income", type: "total", start: 0, end: netIncome, value: netIncome },
  ];

  // ---- geometry ----
  const W = 680;
  const H = 320;
  const padX = 16;
  const padTop = 28;
  const padBottom = 44;
  const plotH = H - padTop - padBottom;
  const slot = (W - padX * 2) / steps.length;
  const barW = slot * 0.52;

  const values = steps.flatMap((s) => [s.start, s.end]);
  let min = Math.min(0, ...values);
  let max = Math.max(0, ...values);
  const span = max - min || 1;
  const pad = span * 0.12;
  min -= pad;
  max += pad;

  const y = (v: number) => padTop + (1 - (v - min) / (max - min)) * plotH;
  const zeroY = y(0);

  // Totals are ink (red if negative); contribution bars are colored by their
  // actual effect on income — green if they add, red if they subtract — so a
  // tax *benefit* in a loss year correctly reads green.
  const colorFor = (s: Step) =>
    s.type === "total" ? (s.end >= 0 ? "#0C1B2A" : "#C24E3A") : s.value >= 0 ? "#15876A" : "#C24E3A";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label="Profit bridge from underwriting result to net income"
    >
      {/* zero baseline */}
      <line x1={padX} x2={W - padX} y1={zeroY} y2={zeroY} stroke="#23384C" strokeWidth={1} />
      <text x={padX} y={zeroY - 6} fontSize="11" fill="#6B7C8C" className="font-mono">
        0
      </text>

      {steps.map((s, i) => {
        const cx = padX + slot * i + slot / 2;
        const x = cx - barW / 2;
        const top = Math.min(y(s.start), y(s.end));
        const h = Math.max(2, Math.abs(y(s.start) - y(s.end)));
        const fill = colorFor(s);
        const labelAbove = s.end >= 0;
        const valY = labelAbove ? top - 8 : top + h + 16;

        // connector to next bar's start level
        const next = steps[i + 1];
        const connY = y(s.end);

        return (
          <g key={s.label}>
            {next && (
              <line
                x1={cx + barW / 2}
                x2={padX + slot * (i + 1) + slot / 2 - barW / 2}
                y1={connY}
                y2={connY}
                stroke="#5b6e80"
                strokeWidth={1}
                strokeDasharray="3 3"
                opacity={0.7}
              />
            )}
            <rect x={x} y={top} width={barW} height={h} rx={3} fill={fill} opacity={s.type === "total" ? 1 : 0.92} />
            <text
              x={cx}
              y={valY}
              textAnchor="middle"
              fontSize="13"
              fontWeight={700}
              fill={fill === "#0C1B2A" ? "#0C1B2A" : fill}
              className="font-mono"
            >
              {s.value >= 0 ? "+" : "−"}
              {Math.abs(s.value).toFixed(0)}
            </text>
            <text
              x={cx}
              y={H - 22}
              textAnchor="middle"
              fontSize="12"
              fill="#3A4F63"
              fontWeight={s.type === "total" ? 700 : 500}
            >
              {s.label}
            </text>
            {s.type === "total" && (
              <text x={cx} y={H - 7} textAnchor="middle" fontSize="10" fill="#6B7C8C">
                {i === 0 ? "engine #1" : "the bottom line"}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
