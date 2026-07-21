'use client';

import { memo } from 'react';
import { ChatHeader } from '@/app/chat/components/ChatHeader';
import { ChatSidebar } from '@/app/chat/components/ChatSidebar';
import type { ChatConversation } from '@/app/chat/types/chat';

interface ChatLayoutProps {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  conversations: ChatConversation[];
  activeConversationId: string | null;
  onToggleSidebar: () => void;
  onNewChat: () => void;
  onSelectConversation: (conversationId: string) => void;
  onDeleteConversation: (conversationId: string) => void;
  conversationTitle: string;
}

export const ChatLayout = memo(function ChatLayout({
  children,
  isSidebarOpen,
  conversations,
  activeConversationId,
  onToggleSidebar,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  conversationTitle,
}: ChatLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
        <ChatSidebar
          isOpen={isSidebarOpen}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onNewChat={onNewChat}
          onSelectConversation={onSelectConversation}
          onDeleteConversation={onDeleteConversation}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <ChatHeader
            conversationTitle={conversationTitle}
            onToggleSidebar={onToggleSidebar}
            onNewChat={onNewChat}
          />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
});
