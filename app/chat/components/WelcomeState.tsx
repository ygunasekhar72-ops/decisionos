'use client';

import { memo } from 'react';
import { chatSuggestions } from '@/app/chat/lib/chat';

interface WelcomeStateProps {
  onSelectSuggestion: (prompt: string) => void;
}

export const WelcomeState = memo(function WelcomeState({ onSelectSuggestion }: WelcomeStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
      <div className="w-full max-w-3xl rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:p-10">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-background-secondary)] text-2xl">
            ✦
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Hello 👋
          </h2>
          <p className="text-xl font-medium text-[var(--color-primary)]">I&apos;m DecisionOS Mentor.</p>
          <p className="mx-auto max-w-2xl text-base leading-8 text-[var(--color-text-secondary)]">
            I&apos;ve already learned about your interests, strengths, academic profile, and future goals.
            I&apos;m here to help you explore careers, choose academic paths, develop skills, and plan your future.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {chatSuggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              type="button"
              onClick={() => onSelectSuggestion(suggestion.prompt)}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-background-secondary)]"
            >
              {suggestion.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});
