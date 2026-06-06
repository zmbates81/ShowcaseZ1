import { buckeye } from "@/app/lib/insurer";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 120%, rgba(194,154,76,0.16) 0%, rgba(12,27,42,0) 60%)",
        }}
        aria-hidden
      />
      <div className="container-wide relative px-5 py-20 sm:px-8">
        <div className="container-prose text-center">
          <p className="display text-balance text-3xl text-paper sm:text-4xl">
            That&rsquo;s the whole game: price risk well, invest the float, and never
            stop watching the <span className="text-gold">100% line</span>.
          </p>
          <a
            href="#top"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-line-dark px-5 py-2.5 text-sm font-medium text-paper/80 transition hover:border-gold/60 hover:text-paper"
          >
            <span className="text-gold">↑</span> Back to the top
          </a>
        </div>

        <div className="mx-auto mt-16 max-w-4xl rule-dark" />

        <div className="mx-auto mt-8 flex max-w-4xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="11" stroke="#C29A4C" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="4.5" fill="#C29A4C" />
            </svg>
            <span className="text-sm font-semibold text-paper/85">{buckeye.name}</span>
          </div>
          <p className="text-xs leading-relaxed text-paper/45">
            {buckeye.name} is fictional. All figures are illustrative and built for
            teaching, not investment advice.
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-paper/35">
          A field guide to reading insurance financials · Made in {buckeye.city}
        </p>
      </div>
    </footer>
  );
}
