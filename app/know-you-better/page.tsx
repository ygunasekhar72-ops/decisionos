'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { thinkingQuestions } from '@/data/thinkingQuestions';
import { useStudentContext } from '@/context/StudentContext';

export default function KnowYouBetterPage() {
  const router = useRouter();
  const { onboardingAnswers, setOnboardingAnswers } = useStudentContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = useMemo(() => thinkingQuestions[currentIndex], [currentIndex]);
  const selectedOption = onboardingAnswers.thinkingAnswers[currentQuestion.id] ?? '';
  const customAnswer = onboardingAnswers.thinkingCustomAnswers[currentQuestion.id] ?? '';

  const totalQuestions = thinkingQuestions.length;
  const totalSteps = 5;
  const currentStep = 3;
  const progressPercent = (currentStep / totalSteps) * 100;
  const isCustomVisible = selectedOption === 'Something else...';

  const handleSelectOption = (option: string) => {
    const nextThinkingAnswers = {
      ...onboardingAnswers.thinkingAnswers,
      [currentQuestion.id]: option,
    };
    const nextThinkingCustomAnswers = { ...onboardingAnswers.thinkingCustomAnswers };

    if (option !== 'Something else...') {
      delete nextThinkingCustomAnswers[currentQuestion.id];
    }

    setOnboardingAnswers({
      ...onboardingAnswers,
      thinkingAnswers: nextThinkingAnswers,
      thinkingCustomAnswers: nextThinkingCustomAnswers,
    });
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleCustomAnswerChange = (value: string) => {
    const nextThinkingCustomAnswers = {
      ...onboardingAnswers.thinkingCustomAnswers,
      [currentQuestion.id]: value,
    };

    setOnboardingAnswers({
      ...onboardingAnswers,
      thinkingAnswers: onboardingAnswers.thinkingAnswers,
      thinkingCustomAnswers: nextThinkingCustomAnswers,
    });
  };

  const canContinue = Boolean(
    selectedOption && (selectedOption !== 'Something else...' || customAnswer.trim().length > 0)
  );

  const handleComplete = () => {
    if (!canContinue) return;
    router.push('/building-profile');
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-background)] px-4 py-10 text-[var(--color-text-primary)] sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,185,145,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(64,1,6,0.07),transparent_24%)]" />
      <div className="absolute left-8 top-24 h-44 w-44 rounded-full bg-[var(--color-accent)]/20 blur-3xl animate-blob" />
      <div className="absolute right-10 bottom-20 h-56 w-56 rounded-full bg-[var(--color-primary)]/10 blur-3xl animate-blob animation-delay-2000" />

      <div className="relative z-10 w-full max-w-3xl">
        <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-8 shadow-[var(--shadow-soft)] sm:px-10 sm:py-10">
          <div className="animate-fade-in-down">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-secondary)]">
                Step 3 of 5
              </span>
              <span className="text-sm font-semibold text-[var(--color-primary)]">{Math.round(progressPercent)}%</span>
            </div>

            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--color-background-secondary)]">
              <div
                className="h-full rounded-full bg-[var(--color-primary)] shadow-[0_0_16px_rgba(64,1,6,0.16)] transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between text-sm text-[var(--color-text-secondary)] animate-fade-in-up delay-200">
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
            <span className="text-[var(--color-primary)]">{currentQuestion.category}</span>
          </div>

          <div className="mt-6 text-center animate-fade-in-up delay-200">
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
              Know You Better
            </h1>
            <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
              This short check-in helps DecisionOS understand how you think before the conversation begins.
            </p>
          </div>

          <div className="mt-8 rounded-[28px] border border-[var(--color-border)] bg-[var(--color-background)] p-5 shadow-[0_14px_40px_rgba(64,1,6,0.05)] sm:p-8 animate-fade-in-up delay-300">
            <h2 className="text-2xl font-semibold leading-tight text-[var(--color-text-primary)] sm:text-[1.75rem]">
              {currentQuestion.question}
            </h2>

            <div className="mt-8 grid gap-4">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelectOption(option)}
                    className={`group flex items-center justify-between rounded-[24px] border px-5 py-4 text-left transition-all duration-300 ${
                      isSelected
                        ? 'border-[var(--color-primary)] bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] shadow-[0_12px_28px_rgba(64,1,6,0.06)]'
                        : 'border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-secondary)] hover:-translate-y-1 hover:border-[var(--color-accent)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    <span className="text-sm font-medium leading-7 sm:text-base">{option}</span>
                    <span
                      className={`ml-4 flex h-7 w-7 items-center justify-center rounded-full border transition-all ${
                        isSelected
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                          : 'border-[var(--color-border)] bg-transparent text-transparent group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-primary)]'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ${isCustomVisible ? 'mt-5 max-h-48 opacity-100' : 'mt-0 max-h-0 opacity-0'}`}
            >
              <label className="block text-sm font-medium text-[var(--color-text-primary)]" htmlFor="custom-answer">
                Tell us in your own words...
              </label>
              <textarea
                id="custom-answer"
                value={customAnswer}
                onChange={(event) => handleCustomAnswerChange(event.target.value)}
                placeholder="Tell us in your own words..."
                autoFocus
                className="mt-3 min-h-28 w-full rounded-[20px] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] transition duration-300 focus:border-[var(--color-accent)] focus:bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="inline-flex w-full justify-center rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] px-6 py-4 text-sm font-medium text-[var(--color-text-primary)] transition duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-background-secondary)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              ← Previous
            </button>

            {currentIndex === totalQuestions - 1 ? (
              <button
                type="button"
                onClick={handleComplete}
                disabled={!canContinue}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-[var(--color-primary)] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_50px_rgba(64,1,6,0.16)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--color-hover)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
              >
                Complete
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canContinue}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-[var(--color-primary)] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_50px_rgba(64,1,6,0.16)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--color-hover)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
              >
                Next
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
