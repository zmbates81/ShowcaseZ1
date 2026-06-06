// ──────────────────────────────────────────────────────────────────────────
// Buckeye Mutual — a fictional Columbus, Ohio property & casualty insurer.
// All figures are illustrative and expressed in $ millions for fiscal year 2025.
// The numbers are internally consistent so every subtotal actually ties out.
// ──────────────────────────────────────────────────────────────────────────

import { round } from "./format";

export type LineTone = "neutral" | "subtotal" | "total" | "positive" | "negative";

export interface StatementLine {
  id: string;
  /** Indentation / hierarchy level for the rendered statement. */
  label: string;
  value: number;
  tone: LineTone;
  /** When true the line is a calculated subtotal/total (rendered with a rule). */
  emphasis?: boolean;
  /** Short tag shown on the right of the statement for ratio lines. */
  tag?: string;
}

export interface Annotation {
  id: string; // matches a StatementLine id it highlights
  step: string; // e.g. "01"
  title: string;
  body: string;
  formula?: string;
  takeaway?: string;
}

// ── The statement, as line items ───────────────────────────────────────────
// GWP 1200  − ceded 175            = NWP 1025
// NWP 1025  − Δ unearned 25        = NEP 1000
// NEP 1000  − losses/LAE/expenses  = Underwriting result 37
// + investments/realized − interest= Pre-tax 125
// − tax 26                         = Net income 99

// Net earned premium is set to exactly $1,000M so every cost line reads as its
// own percentage of premium and the ratios tie out with zero rounding drift:
// losses+LAE 620 = 62.0%, expenses 343 = 34.3%, combined 96.3%, underwriting 37 = 3.7%.
const GWP = 1200.0;
const CEDED = -175.0;
const NWP = round(GWP + CEDED); // 1025
const CHANGE_UNEARNED = -25.0;
const NEP = round(NWP + CHANGE_UNEARNED); // 1000

const LOSSES = -575.0;
const LAE = -45.0;
const ACQUISITION = -156.0;
const OTHER_UW = -187.0;
const UW_RESULT = round(NEP + LOSSES + LAE + ACQUISITION + OTHER_UW); // 37

const NET_INV_INCOME = 85.0;
const REALIZED_GAINS = 10.0;
const INTEREST_EXPENSE = -7.0;
const PRE_TAX = round(UW_RESULT + NET_INV_INCOME + REALIZED_GAINS + INTEREST_EXPENSE); // 125

const TAX = -26.0;
const NET_INCOME = round(PRE_TAX + TAX); // 99

export const buckeye = {
  name: "Buckeye Mutual",
  city: "Columbus, Ohio",
  fy: "FY2025",
  lines: {
    GWP,
    CEDED,
    NWP,
    CHANGE_UNEARNED,
    NEP,
    LOSSES,
    LAE,
    ACQUISITION,
    OTHER_UW,
    UW_RESULT,
    NET_INV_INCOME,
    REALIZED_GAINS,
    INTEREST_EXPENSE,
    PRE_TAX,
    TAX,
    NET_INCOME,
  },
};

// ── Ratios (the scoreboard) ────────────────────────────────────────────────
export const lossRatio = round((-(LOSSES + LAE) / NEP) * 100); // 62.0
export const expenseRatio = round((-(ACQUISITION + OTHER_UW) / NEP) * 100); // 34.3
export const combinedRatio = round(lossRatio + expenseRatio); // 96.3
export const uwMargin = round(100 - combinedRatio); // 3.6 points of underwriting profit

// Approximate float (premiums held before they are paid out as claims).
export const floatEstimate = 1300; // ≈ 1.3x net earned premium

// ── The annotated statement (scrollytelling steps) ─────────────────────────
export const statement: StatementLine[] = [
  { id: "gwp", label: "Gross written premium", value: GWP, tone: "neutral" },
  { id: "ceded", label: "Less: ceded to reinsurers", value: CEDED, tone: "negative" },
  { id: "nwp", label: "Net written premium", value: NWP, tone: "subtotal", emphasis: true },
  { id: "unearned", label: "Less: change in unearned premium", value: CHANGE_UNEARNED, tone: "negative" },
  { id: "nep", label: "Net earned premium", value: NEP, tone: "subtotal", emphasis: true, tag: "the denominator" },
  { id: "losses", label: "Net losses incurred", value: LOSSES, tone: "negative" },
  { id: "lae", label: "Loss adjustment expense (LAE)", value: LAE, tone: "negative" },
  { id: "acq", label: "Acquisition costs & commissions", value: ACQUISITION, tone: "negative" },
  { id: "otheruw", label: "Other underwriting expenses", value: OTHER_UW, tone: "negative" },
  { id: "uw", label: "Underwriting profit", value: UW_RESULT, tone: "subtotal", emphasis: true, tag: "engine #1" },
  { id: "inv", label: "Net investment income", value: NET_INV_INCOME, tone: "positive", tag: "engine #2" },
  { id: "realized", label: "Net realized gains", value: REALIZED_GAINS, tone: "positive" },
  { id: "interest", label: "Interest expense", value: INTEREST_EXPENSE, tone: "negative" },
  { id: "pretax", label: "Pre-tax income", value: PRE_TAX, tone: "subtotal", emphasis: true },
  { id: "tax", label: "Income tax", value: TAX, tone: "negative" },
  { id: "net", label: "Net income", value: NET_INCOME, tone: "total", emphasis: true },
];

export const annotations: Annotation[] = [
  {
    id: "gwp",
    step: "01",
    title: "Start at the top: premium written",
    body: "Gross written premium is the total dollar value of all the policies Buckeye sold this year — the headline sales number. But unlike most businesses, this top line is a promise, not a delivery. The product hasn't been 'made' yet, because the claims haven't happened yet.",
    takeaway: "The top line is money in. The cost of goods is still unknown.",
  },
  {
    id: "ceded",
    step: "02",
    title: "Reinsurance: insurance for the insurer",
    body: "No insurer keeps all its risk. Buckeye hands a slice of its premium to reinsurers, who agree to pay a slice of the claims. It's a hedge against a single bad storm wiping out the year. The premium it gives away is 'ceded.'",
    formula: "Ceded premium = premium paid away to lay off risk",
    takeaway: "Ceding premium trades some upside for a lot less tail risk.",
  },
  {
    id: "nwp",
    step: "03",
    title: "Net written premium: the risk you keep",
    body: "Subtract what was ceded and you get net written premium — the business Buckeye is actually keeping on its own books. This is the line that scales the company's true exposure.",
    formula: "Net written = Gross written − Ceded",
    takeaway: "Net written premium is risk retained, not risk sold.",
  },
  {
    id: "unearned",
    step: "04",
    title: "You haven't earned it yet",
    body: "Sell a 12-month policy on Dec 1 and you've only 'earned' one month of it by Dec 31 — the other eleven months sit on the balance sheet as unearned premium, a liability. As the policy ages, that liability releases into revenue. Growing fast? Earned premium lags written premium.",
    takeaway: "Premium is earned over time, not when the check clears.",
  },
  {
    id: "nep",
    step: "05",
    title: "Net earned premium — the number everything is measured against",
    body: "This is the real revenue for the period and the denominator for every ratio that matters. When an analyst says 'loss ratio' or 'combined ratio,' this is what they're dividing by. Anchor on it.",
    formula: "Net earned = Net written − change in unearned premium",
    takeaway: "Memorize this line. Every ratio below is a fraction of it.",
  },
  {
    id: "losses",
    step: "06",
    title: "The cost of goods, finally — and it's an estimate",
    body: "Net losses incurred is what Buckeye expects to pay on this year's claims. Crucially, it's claims paid PLUS the change in reserves — management's estimate of claims that happened but haven't been fully settled (or even reported yet: 'IBNR'). This single line is the biggest judgment call in the whole statement.",
    takeaway: "Losses incurred ≠ losses paid. Reserves are an estimate — watch them.",
  },
  {
    id: "lae",
    step: "07",
    title: "It costs money to pay claims",
    body: "Loss adjustment expense is the cost of investigating, defending and settling claims — adjusters, lawyers, experts. It travels with losses, so analysts usually bundle them: 'loss & LAE.'",
    takeaway: "Always read losses and LAE together.",
  },
  {
    id: "acq",
    step: "08",
    title: "What it cost to win the business",
    body: "Acquisition costs are mostly commissions paid to the agents and brokers who sold the policies, plus premium taxes. The more you grow through intermediaries, the heavier this line.",
    takeaway: "Distribution isn't free — it's the first slice of the expense ratio.",
  },
  {
    id: "otheruw",
    step: "09",
    title: "The cost of running the place",
    body: "Salaries, technology, rent, underwriting and admin — the overhead of operating an insurance company. Together with acquisition costs, this forms the expense ratio.",
    takeaway: "Acquisition + other expenses = how efficient the operation is.",
  },
  {
    id: "uw",
    step: "10",
    title: "Engine #1: did the insurance itself make money?",
    body: "Premium earned, minus every claim and expense. If this is positive, Buckeye made a profit purely from underwriting — before earning a single dollar on investments. Most insurers, most years, struggle to keep this line positive. Buckeye cleared $37M.",
    formula: "Underwriting profit = Earned premium − losses − LAE − expenses",
    takeaway: "A positive underwriting result is the mark of disciplined pricing.",
  },
  {
    id: "inv",
    step: "11",
    title: "Engine #2: the money the premiums earn while you hold them",
    body: "Here's the quiet magic of insurance. Buckeye collects premium today and pays claims later — sometimes years later. In the meantime it invests that money (the 'float') and keeps the returns. This line is the payoff.",
    takeaway: "Investment income turns 'holding other people's money' into profit.",
  },
  {
    id: "realized",
    step: "12",
    title: "Gains taken off the table",
    body: "When Buckeye sells investments for more than it paid, the profit shows up here as realized gains. It's real, but it's lumpier and lower-quality than the steady investment income above — don't give it the same weight.",
    takeaway: "Discount one-time gains; prize recurring investment income.",
  },
  {
    id: "interest",
    step: "13",
    title: "The cost of the company's own debt",
    body: "Interest Buckeye pays on the money it has borrowed at the holding-company level. Small here, but it's a reminder that the insurer has its own capital structure on top of all the policyholder money.",
    takeaway: "Leverage has a price; it sits below the underwriting line.",
  },
  {
    id: "pretax",
    step: "14",
    title: "Both engines, combined",
    body: "Underwriting profit plus investment results, less interest. This is the whole business firing on its two cylinders before the tax authorities take their cut.",
    formula: "Pre-tax = Underwriting + investments − interest",
    takeaway: "Healthy insurers run on both engines, not just one.",
  },
  {
    id: "tax",
    step: "15",
    title: "The government's share",
    body: "Corporate income tax. Nothing exotic — but note the effective rate, because reserve timing and tax-advantaged municipal-bond income can move it around year to year.",
    takeaway: "A surprisingly low tax rate often means muni-bond income.",
  },
  {
    id: "net",
    step: "16",
    title: "The bottom line",
    body: "Net income: $99M. Now the real question — and the one most people skip — is where it came from. $37M of underwriting and $85M of investments tells a very different story than $0M of underwriting propped up by $120M of investments. Always read the mix.",
    takeaway: "Don't just read net income. Read which engine produced it.",
  },
];

// ── The simulator: a simplified two-engine model ───────────────────────────
// Net income = (underwriting result + float × yield) taxed at a flat rate.
export const TAX_RATE = 0.21;

export interface SimInputs {
  nep: number; // net earned premium, $M (fixed in UI but kept as a param)
  lossRatio: number; // %
  expenseRatio: number; // %
  floatMultiple: number; // float as a multiple of NEP
  yield: number; // investment yield on float, %
}

export interface SimResult {
  combinedRatio: number;
  underwriting: number;
  float: number;
  investmentIncome: number;
  preTax: number;
  tax: number;
  netIncome: number;
  verdict: Verdict;
}

export type Verdict = {
  key: "paid-to-hold" | "uw-profit" | "rescued" | "underwater";
  headline: string;
  detail: string;
  tone: "great" | "good" | "warn" | "bad";
};

export const SIM_DEFAULTS: SimInputs = {
  nep: 1000,
  lossRatio: 62,
  expenseRatio: 34.3,
  floatMultiple: 1.3,
  yield: 4.0,
};

export function simulate(input: SimInputs): SimResult {
  const combinedRatio = round(input.lossRatio + input.expenseRatio);
  const underwriting = round(input.nep * (1 - combinedRatio / 100));
  const float = round(input.nep * input.floatMultiple);
  const investmentIncome = round(float * (input.yield / 100));
  const preTax = round(underwriting + investmentIncome);
  const tax = round(preTax * TAX_RATE);
  const netIncome = round(preTax - tax);

  let verdict: Verdict;
  if (combinedRatio <= 100 && underwriting > 0 && netIncome > 0) {
    if (combinedRatio < 97) {
      verdict = {
        key: "paid-to-hold",
        headline: "You're being paid to hold the float.",
        detail:
          "Combined ratio under 100% means underwriting itself is profitable — so every dollar of investment income is pure upside. This is the insurance dream.",
        tone: "great",
      };
    } else {
      verdict = {
        key: "uw-profit",
        headline: "Underwriting profit — both engines firing.",
        detail:
          "Combined ratio is below 100%, so the insurance is profitable on its own and investment income stacks on top.",
        tone: "good",
      };
    }
  } else if (netIncome > 0) {
    verdict = {
      key: "rescued",
      headline: "Underwriting loss — rescued by the float.",
      detail:
        "Combined ratio is above 100%, so the insurance lost money. The company is only profitable because investment income bailed it out. Risky if markets turn.",
      tone: "warn",
    };
  } else {
    verdict = {
      key: "underwater",
      headline: "Underwater — even the float can't save it.",
      detail:
        "Underwriting losses are deep enough that investment income can't cover them. This is a cash-burning year.",
      tone: "bad",
    };
  }

  return { combinedRatio, underwriting, float, investmentIncome, preTax, tax, netIncome, verdict };
}

export interface Preset {
  id: string;
  name: string;
  blurb: string;
  inputs: SimInputs;
}

export const PRESETS: Preset[] = [
  {
    id: "default",
    name: "Buckeye FY25",
    blurb: "The worked example from this guide.",
    inputs: { ...SIM_DEFAULTS },
  },
  {
    id: "hard",
    name: "Hard market",
    blurb: "Prices firm, discipline reigns — fat margins.",
    inputs: { nep: 1000, lossRatio: 55, expenseRatio: 31, floatMultiple: 1.2, yield: 4.5 },
  },
  {
    id: "soft",
    name: "Soft market",
    blurb: "Competition crushes pricing — underwriting bleeds.",
    inputs: { nep: 1000, lossRatio: 70, expenseRatio: 33, floatMultiple: 1.4, yield: 3.5 },
  },
  {
    id: "cat",
    name: "Catastrophe year",
    blurb: "A brutal storm season swamps the loss ratio.",
    inputs: { nep: 1000, lossRatio: 95, expenseRatio: 33, floatMultiple: 1.3, yield: 4.0 },
  },
  {
    id: "buffett",
    name: "Buffett's dream",
    blurb: "Profitable underwriting AND a big, cheap float.",
    inputs: { nep: 1000, lossRatio: 58, expenseRatio: 28, floatMultiple: 2.0, yield: 5.0 },
  },
];

// ── Cheat-sheet glossary ───────────────────────────────────────────────────
export interface GlossaryItem {
  term: string;
  def: string;
  formula?: string;
}

export const glossary: GlossaryItem[] = [
  {
    term: "Gross / Net written premium",
    def: "Total premium sold, before and after handing risk to reinsurers.",
    formula: "Net = Gross − ceded",
  },
  {
    term: "Net earned premium (NEP)",
    def: "Premium recognized as revenue as policies age. The denominator for every ratio.",
  },
  {
    term: "Loss ratio",
    def: "Share of premium eaten by claims and the cost of settling them.",
    formula: "(Losses + LAE) ÷ NEP",
  },
  {
    term: "Expense ratio",
    def: "Share of premium eaten by commissions and overhead.",
    formula: "Underwriting expenses ÷ NEP",
  },
  {
    term: "Combined ratio",
    def: "The headline scorecard. Under 100% = underwriting profit; over 100% = loss.",
    formula: "Loss ratio + Expense ratio",
  },
  {
    term: "Underwriting profit",
    def: "Did the insurance make money before any investing? Engine #1.",
    formula: "NEP × (1 − combined ratio)",
  },
  {
    term: "Float",
    def: "Premiums held between collection and payout. Invested money you don't yet owe.",
  },
  {
    term: "Investment income",
    def: "Returns earned on the float (and capital). Engine #2.",
  },
  {
    term: "Reserves & IBNR",
    def: "Estimated cost of claims not yet settled or even reported. The biggest judgment call.",
  },
];

export const checklist = [
  {
    n: "01",
    q: "Is the combined ratio under 100%?",
    a: "Under 100% means the insurance itself is profitable. Over 100% means it isn't — and the company is leaning on investments.",
  },
  {
    n: "02",
    q: "Where did the profit come from?",
    a: "Split net income into underwriting vs. investments. Profit built on underwriting is far higher quality than profit propped up by markets.",
  },
  {
    n: "03",
    q: "Are the reserves honest?",
    a: "Watch 'prior-year development.' Favorable means past reserves were conservative; adverse means they were too thin. It's the tell for management's candor.",
  },
];
