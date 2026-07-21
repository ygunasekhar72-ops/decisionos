'use client';

import { memo } from 'react';

export const TypingIndicator = memo(function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in-up">
      <div className="flex max-w-[86%] items-center gap-3 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 shadow-[0_10px_30px_rgba(64,1,6,0.06)]">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-background-secondary)] text-[var(--color-primary)]">
          ✦
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--color-primary)] [animation-delay:-0.2s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--color-primary)] [animation-delay:-0.1s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--color-primary)] [animation-delay:0s]" />
        </div>
        <span className="text-sm text-[var(--color-text-secondary)]">DecisionOS Mentor is thinking...</span>
      </div>
    </div>
  );
});
