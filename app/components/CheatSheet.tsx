import { checklist, glossary } from "@/app/lib/insurer";
import Reveal from "./ui/Reveal";

export default function CheatSheet() {
  return (
    <section id="cheat-sheet" className="section-pad bg-paper-2 paper-grain">
      <div className="container-wide">
        <Reveal className="container-prose text-center">
          <p className="eyebrow">Keep this</p>
          <h2 className="display mt-4 text-balance text-4xl text-ink sm:text-5xl">
            The 60-second cheat sheet
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-soft">
            Next time an insurer&rsquo;s P&amp;L lands on your desk, start here.
            Screenshot it &mdash; future you will thank you.
          </p>
        </Reveal>

        {/* the 3-question checklist */}
        <div className="mx-auto mt-14 max-w-4xl">
          <Reveal className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-gold-deep">
            Three questions, in order
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {checklist.map((item, i) => (
              <Reveal key={item.n} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-6 shadow-card">
                  <span className="tnum font-serif text-3xl font-semibold text-gold">{item.n}</span>
                  <h3 className="mt-3 text-base font-semibold text-ink">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* glossary */}
        <div className="mx-auto mt-16 max-w-4xl">
          <Reveal className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-gold-deep">
            The vocabulary
          </Reveal>
          <Reveal className="overflow-hidden rounded-2xl border border-line bg-paper shadow-card">
            <dl className="grid sm:grid-cols-2">
              {glossary.map((g, i) => (
                <div
                  key={g.term}
                  className={[
                    "border-line p-5",
                    i % 2 === 0 ? "sm:border-r" : "",
                    i < glossary.length - (glossary.length % 2 === 0 ? 2 : 1) ? "border-b" : "",
                  ].join(" ")}
                >
                  <dt className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold text-ink">{g.term}</span>
                    {g.formula && (
                      <span className="tnum shrink-0 rounded bg-paper-2 px-2 py-0.5 font-mono text-[11px] text-ink-soft">
                        {g.formula}
                      </span>
                    )}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">{g.def}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
