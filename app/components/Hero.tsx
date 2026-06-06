import { buckeye } from "@/app/lib/insurer";

export default function Hero() {
  return (
    <header className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper">
      {/* backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background:
            "radial-gradient(80% 60% at 50% -10%, rgba(194,154,76,0.18) 0%, rgba(12,27,42,0) 60%), radial-gradient(60% 50% at 90% 110%, rgba(26,161,127,0.12) 0%, rgba(12,27,42,0) 55%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent 75%)",
        }}
        aria-hidden
      />

      {/* top utility bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <div className="flex items-center gap-2.5">
          <BuckeyeMark />
          <span className="text-sm font-semibold tracking-wide text-paper/90">
            {buckeye.name}
          </span>
        </div>
        <span className="eyebrow-light hidden sm:block">Field Guide</span>
        <span className="tnum rounded-full border border-line-dark px-3 py-1 text-xs text-paper/70">
          {buckeye.fy}
        </span>
      </div>

      {/* hero body */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 pb-24 pt-8 text-center sm:px-8">
        <p className="eyebrow-light animate-fade-up" style={{ animationDelay: "60ms" }}>
          An interactive field guide
        </p>
        <h1
          className="display mt-5 text-balance text-5xl text-paper animate-fade-up sm:text-6xl md:text-7xl"
          style={{ animationDelay: "140ms" }}
        >
          How to read an
          <br className="hidden sm:block" /> insurer&rsquo;s{" "}
          <span className="relative whitespace-nowrap text-gold">
            P&amp;L
            <svg
              className="absolute -bottom-3 left-0 w-full"
              viewBox="0 0 200 12"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M2 8C40 3 160 3 198 8"
                stroke="#C29A4C"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>
        <p
          className="mt-9 max-w-2xl text-pretty text-lg leading-relaxed text-paper/80 animate-fade-up sm:text-xl"
          style={{ animationDelay: "240ms" }}
        >
          Insurance is the only business that sells its product before it knows
          what it costs. So its scoreboard reads like no other company&rsquo;s.
          Here&rsquo;s how to read it &mdash; one line at a time.
        </p>
        <p
          className="mt-6 max-w-xl text-sm text-paper/55 animate-fade-up"
          style={{ animationDelay: "320ms" }}
        >
          A worked example with <strong className="font-semibold text-paper/75">{buckeye.name}</strong>, a
          (fictional) property &amp; casualty insurer in {buckeye.city}.
        </p>

        <a
          href="#big-idea"
          className="group mt-12 inline-flex items-center gap-2 rounded-full border border-line-dark bg-ink-2/60 px-5 py-2.5 text-sm font-medium text-paper/80 backdrop-blur transition hover:border-gold/60 hover:text-paper animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          Start reading
          <span className="animate-bob text-gold">↓</span>
        </a>
      </div>
    </header>
  );
}

function BuckeyeMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="11" stroke="#C29A4C" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" fill="#C29A4C" />
    </svg>
  );
}
