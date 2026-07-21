'use client';

import { memo } from 'react';

interface ChatHeaderProps {
  conversationTitle: string;
  onToggleSidebar: () => void;
  onNewChat: () => void;
}

export const ChatHeader = memo(function ChatHeader({
  conversationTitle,
  onToggleSidebar,
  onNewChat,
}: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)]/80 bg-[var(--color-background)]/85 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-primary)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-background)] md:hidden"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-[0.24em] text-[var(--color-primary)] uppercase">
                DecisionOS
              </span>
              <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" aria-label="Online" />
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {conversationTitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNewChat}
          className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-background)]"
        >
          New chat
        </button>
      </div>
    </header>
  );
});
