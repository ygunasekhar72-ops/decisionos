import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center text-[var(--color-text-primary)] overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-40 animate-hero-glow" />
      <div className="relative z-10 flex max-w-4xl flex-col items-center px-6 py-24 text-center">
        <h1 className="text-6xl font-bold tracking-tight text-[var(--color-primary)] animate-fade-in-down">
          DecisionOS
        </h1>

        <p className="mt-6 max-w-2xl text-[var(--color-text-secondary)] text-xl leading-8 animate-fade-in-up delay-200">
          Clarity before Choice.
        </p>

        <Link
          href="/welcome"
          className="mt-12 inline-flex items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-primary)] px-10 py-4 text-base font-semibold text-white shadow-[0_18px_50px_rgba(64,1,6,0.16)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--color-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] animate-glow-button"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}



