'use client';

import { memo, useEffect, useRef } from 'react';
import type { ChatMessage } from '@/app/chat/types/chat';
import { ChatMessage as ChatMessageItem } from '@/app/chat/components/ChatMessage';
import { TypingIndicator } from '@/app/chat/components/TypingIndicator';

interface ChatContainerProps {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
}

export const ChatContainer = memo(function ChatContainer({ messages, loading, error }: ChatContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        {messages.length === 0 && !loading ? (
          <div className="py-8 text-center text-sm text-[var(--color-text-secondary)]">
            Start a conversation to explore your next step.
          </div>
        ) : null}

        {messages.map((message) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}

        {loading ? <TypingIndicator /> : null}
        {error ? (
          <div className="rounded-[24px] border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 p-4 text-sm text-[var(--color-error)]">
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
});
