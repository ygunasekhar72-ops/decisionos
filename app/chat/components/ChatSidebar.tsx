'use client';

import { memo } from 'react';
import type { ChatConversation } from '@/app/chat/types/chat';

interface ChatSidebarProps {
  isOpen: boolean;
  conversations: ChatConversation[];
  activeConversationId: string | null;
  onNewChat: () => void;
  onSelectConversation: (conversationId: string) => void;
  onDeleteConversation: (conversationId: string) => void;
}

export const ChatSidebar = memo(function ChatSidebar({
  isOpen,
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
}: ChatSidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-72 border-r border-[var(--color-border)] bg-[var(--color-card)]/95 p-4 backdrop-blur-xl transition-transform duration-250 md:static md:flex md:w-72 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-2 py-2">
          <div>
            <p className="text-sm font-semibold tracking-[0.26em] uppercase text-[var(--color-primary)]">
              DecisionOS
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">Mentor</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={onNewChat}
            className="flex items-center justify-center rounded-2xl bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-hover)]"
          >
            New Chat
          </button>
        </div>

        <div className="mt-8 flex-1 overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-background)] p-4">
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">Recent Conversations</p>

          <div className="mt-4 flex max-h-[340px] flex-col gap-2 overflow-y-auto pr-1">
            {conversations.map((conversation) => {
              const isActive = conversation.id === activeConversationId;
              return (
                <div
                  key={conversation.id}
                  className={`rounded-[18px] border px-3 py-3 transition ${isActive ? 'border-[var(--color-accent)] bg-[var(--color-card)] shadow-[0_10px_30px_rgba(64,1,6,0.06)]' : 'border-transparent bg-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-card)]'}`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectConversation(conversation.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-[var(--color-text-primary)]">
                        {conversation.title}
                      </p>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                        {new Date(conversation.updatedAt).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                      {conversation.lastMessagePreview || 'Start the conversation'}
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteConversation(conversation.id)}
                    className="mt-2 inline-flex items-center rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs font-medium text-[var(--color-error)] transition hover:bg-[var(--color-background)]"
                    aria-label={`Delete ${conversation.title}`}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-sm text-[var(--color-text-secondary)]">
          Files, photos, and camera access are enabled from the composer.
        </div>
      </div>
    </aside>
  );
});
