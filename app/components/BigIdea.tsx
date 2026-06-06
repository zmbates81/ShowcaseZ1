import Reveal from "./ui/Reveal";

export default function BigIdea() {
  return (
    <section id="big-idea" className="section-pad paper-grain relative">
      <div className="container-wide">
        <Reveal className="container-prose text-center">
          <p className="eyebrow">The big idea</p>
          <h2 className="display mt-4 text-balance text-4xl text-ink sm:text-5xl">
            An insurer&rsquo;s P&amp;L runs backwards.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-soft">
            Every other company knows what a sale costs before it makes one. An
            insurer doesn&rsquo;t. It collects your premium today and finds out
            years later what your claim actually cost. That one inversion is the
            key to the entire statement.
          </p>
        </Reveal>

        {/* the inversion */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-5 md:grid-cols-2">
          <Reveal delay={60}>
            <FlowCard
              kicker="A normal business"
              tone="muted"
              steps={["Build the product", "Know your cost", "Sell at a markup"]}
              note="Cost is known. Margin is visible on day one."
            />
          </Reveal>
          <Reveal delay={140}>
            <FlowCard
              kicker="An insurer"
              tone="gold"
              steps={["Sell the promise", "Collect premium now", "Discover the cost later"]}
              note="Cost is an estimate for years. That estimate is called reserves."
            />
          </Reveal>
        </div>

        <Reveal className="container-prose mt-20 text-center">
          <h3 className="display text-3xl text-ink sm:text-4xl">
            So an insurer makes money two ways.
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft">
            Hold these two engines in your head and the whole P&amp;L snaps into
            focus. Everything on the statement is feeding one of them.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <Reveal delay={60}>
            <EngineCard
              n="01"
              title="Underwriting"
              desc="Charge more in premium than you pay in claims and expenses. Pure skill at pricing risk. Below, this is the 'underwriting profit' line."
            />
          </Reveal>
          <Reveal delay={140}>
            <EngineCard
              n="02"
              title="The float"
              desc="You hold premiums for years before paying claims. Invest that money in the meantime and keep the returns. Below, this is 'net investment income.'"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FlowCard({
  kicker,
  steps,
  note,
  tone,
}: {
  kicker: string;
  steps: string[];
  note: string;
  tone: "muted" | "gold";
}) {
  const accent = tone === "gold" ? "text-gold-deep" : "text-muted";
  const ring = tone === "gold" ? "border-gold/40 bg-paper" : "border-line bg-paper";
  return (
    <div className={`h-full rounded-2xl border ${ring} p-7 shadow-card`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${accent}`}>{kicker}</p>
      <ol className="mt-5 space-y-3">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span
              className={`tnum flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                tone === "gold" ? "border-gold/50 text-gold-deep" : "border-line text-muted"
              }`}
            >
              {i + 1}
            </span>
            <span className="text-[15px] font-medium text-ink">{s}</span>
            {i < steps.length - 1 && <span className="ml-auto text-muted">↓</span>}
          </li>
        ))}
      </ol>
      <p className="mt-6 border-t border-line pt-4 text-sm text-ink-soft">{note}</p>
    </div>
  );
}

function EngineCard({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="group h-full rounded-2xl border border-line bg-ink p-7 text-paper shadow-card-dark transition hover:-translate-y-0.5">
      <div className="flex items-baseline justify-between">
        <h4 className="display text-2xl text-paper">{title}</h4>
        <span className="tnum font-serif text-3xl text-gold/60">{n}</span>
      </div>
      <div className="mt-4 h-px w-full bg-line-dark" />
      <p className="mt-4 text-[15px] leading-relaxed text-paper/75">{desc}</p>
    </div>
  );
}
