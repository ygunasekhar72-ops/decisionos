'use client';

import { memo } from 'react';
import type { ChatMessage as ChatMessageModel } from '@/app/chat/types/chat';

interface ChatMessageProps {
  message: ChatMessageModel;
}

export const ChatMessage = memo(function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} animate-fade-in-up`}>
      <div className={`flex max-w-[90%] gap-3 sm:max-w-[82%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isAssistant ? 'bg-[var(--color-background-secondary)] text-[var(--color-primary)]' : 'bg-[var(--color-primary)] text-white'}`}>
          {isAssistant ? '✦' : 'You'}
        </div>

        <div className={`rounded-[24px] px-4 py-3 text-sm leading-7 shadow-[0_10px_30px_rgba(64,1,6,0.06)] ${isAssistant ? 'border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-primary)]' : 'bg-[var(--color-primary)] text-white'}`}>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
});
