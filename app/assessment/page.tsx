'use client';

import Link from "next/link";
import { useStudentContext } from "@/context/StudentContext";

const educationBoards = ["CBSE", "ICSE", "State Board", "IB"];

export default function AssessmentPage() {
  const { onboardingAnswers, setOnboardingAnswers } = useStudentContext();
  const { fullName, age, currentClass, educationBoard } = onboardingAnswers;

  const updateAnswers = (updates: Partial<typeof onboardingAnswers>) => {
    setOnboardingAnswers({
      ...onboardingAnswers,
      ...updates,
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text-primary)] flex items-center justify-center px-4 py-10 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,185,145,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(64,1,6,0.07),transparent_24%)]" />
      <div className="absolute left-8 top-24 h-44 w-44 rounded-full bg-[var(--color-accent)]/20 blur-3xl animate-blob" />
      <div className="absolute right-10 bottom-20 h-56 w-56 rounded-full bg-[var(--color-primary)]/10 blur-3xl animate-blob animation-delay-2000" />

      <div className="relative z-10 w-full max-w-2xl">
        <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-8 shadow-[var(--shadow-soft)] sm:px-10 sm:py-10">
          <div className="animate-fade-in-down">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-secondary)]">
                Step 2 of 5
              </span>
              <span className="text-sm font-semibold text-[var(--color-primary)]">
                40%
              </span>
            </div>

            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--color-background-secondary)]">
              <div className="h-full rounded-full bg-[var(--color-primary)] shadow-[0_0_16px_rgba(64,1,6,0.16)] transition-all duration-700" style={{ width: "40%" }} />
            </div>
          </div>

          <div className="mt-10 text-center animate-fade-in-up delay-200">
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
              Let&apos;s Know You Better
            </h1>
            <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
              Help us personalize your journey before we begin.
            </p>
          </div>

          <form className="mt-10 grid gap-6">
            <div className="grid gap-3">
              <label className="text-sm font-medium text-[var(--color-text-primary)]" htmlFor="full-name">
                Full Name
              </label>
              <input
                id="full-name"
                type="text"
                value={fullName}
                onChange={(event) => updateAnswers({ fullName: event.target.value })}
                placeholder="Enter your full name"
                className="w-full rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] shadow-[0_12px_32px_rgba(64,1,6,0.05)] transition duration-300 focus:border-[var(--color-accent)] focus:bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_1fr] sm:gap-6">
              <div className="grid gap-3">
                <label className="text-sm font-medium text-[var(--color-text-primary)]" htmlFor="age">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  min="10"
                  max="99"
                  value={age}
                  onChange={(event) => updateAnswers({ age: event.target.value })}
                  placeholder="18"
                  className="w-full rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] shadow-[0_12px_32px_rgba(64,1,6,0.05)] transition duration-300 focus:border-[var(--color-accent)] focus:bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                />
              </div>

              <div className="grid gap-3">
                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  Current Class
                </span>
                <div className="grid gap-3 sm:grid-cols-2">
                  {['Class 10', 'Intermediate'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateAnswers({ currentClass: option })}
                      className={`rounded-3xl border px-5 py-4 text-left transition duration-300 ${
                        currentClass === option
                          ? 'border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-text-primary)] shadow-[0_12px_28px_rgba(64,1,6,0.06)]'
                          : 'border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:bg-[var(--color-background)]'
                      }`}
                    >
                      <span className="block text-sm font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <label className="text-sm font-medium text-[var(--color-text-primary)]" htmlFor="education-board">
                Education Board
              </label>
              <select
                id="education-board"
                value={educationBoard}
                onChange={(event) => updateAnswers({ educationBoard: event.target.value })}
                className="w-full appearance-none rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-4 text-[var(--color-text-primary)] shadow-[0_12px_32px_rgba(64,1,6,0.05)] transition duration-300 focus:border-[var(--color-accent)] focus:bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
              >
                {educationBoards.map((board) => (
                  <option key={board} value={board} className="bg-[var(--color-card)] text-[var(--color-text-primary)]">
                    {board}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/welcome"
                className="inline-flex w-full justify-center rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] px-6 py-4 text-sm font-medium text-[var(--color-text-primary)] transition duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-background-secondary)] sm:w-auto"
              >
                ← Back
              </Link>
              <Link
                href="/know-you-better"
                className="inline-flex w-full items-center justify-center rounded-3xl bg-[var(--color-primary)] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_50px_rgba(64,1,6,0.16)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--color-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] sm:w-auto"
              >
                Continue
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
