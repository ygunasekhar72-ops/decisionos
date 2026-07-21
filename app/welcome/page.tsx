import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text-primary)] flex items-center justify-center px-4 py-10 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,185,145,0.22),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(64,1,6,0.07),transparent_24%)]" />
      <div className="absolute left-8 top-24 h-44 w-44 rounded-full bg-[var(--color-accent)]/20 blur-3xl animate-blob" />
      <div className="absolute right-10 bottom-20 h-56 w-56 rounded-full bg-[var(--color-primary)]/10 blur-3xl animate-blob animation-delay-2000" />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-8 shadow-[var(--shadow-soft)] sm:px-10 sm:py-10">
          <div className="animate-fade-in-down">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-secondary)]">
                Step 1 of 5
              </span>
              <span className="text-sm font-semibold text-[var(--color-primary)]">
                20%
              </span>
            </div>

            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--color-background-secondary)]">
              <div className="h-full rounded-full bg-[var(--color-primary)] shadow-[0_0_16px_rgba(64,1,6,0.16)] transition-all duration-700" style={{ width: "20%" }} />
            </div>
          </div>

          <div className="mt-10 text-center animate-fade-in-up delay-200">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-primary)]">
              Welcome
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
              Every student is unique. DecisionOS learns who you are first,
              then recommends the stream made for your goals.
            </h1>
            <p className="mt-6 text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
              We start by understanding your strengths, interests, and ambitions,
              so the path we suggest feels personal, confident, and built for you.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="inline-flex items-center justify-center rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-3 text-sm text-[var(--color-text-secondary)] shadow-[0_12px_30px_rgba(64,1,6,0.04)]">
              ⏱ Takes about 10 seconds
            </div>

            <Link
              href="/assessment"
              className="inline-flex w-full items-center justify-center rounded-3xl bg-[var(--color-primary)] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_50px_rgba(64,1,6,0.16)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--color-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            >
              Begin Assessment
            </Link>
          </div>

          <div className="mt-6 text-center animate-fade-in-up delay-300">
            <Link href="/" className="text-sm font-medium text-[var(--color-text-secondary)] transition hover:text-[var(--color-primary)]">
              ← Back
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}