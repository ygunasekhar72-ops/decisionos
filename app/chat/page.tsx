'use client';

import { useMemo } from 'react';
import { ChatContainer } from '@/app/chat/components/ChatContainer';
import { ChatInput } from '@/app/chat/components/ChatInput';
import { ChatLayout } from '@/app/chat/components/ChatLayout';
import { WelcomeState } from '@/app/chat/components/WelcomeState';
import { useChat } from '@/app/chat/hooks/useChat';

export default function ChatPage() {
  const {
    conversations,
    activeConversationId,
    messages,
    input,
    setInput,
    loading,
    error,
    isSidebarOpen,
    toggleSidebar,
    sendMessage,
    startNewChat,
    selectConversation,
    deleteConversation,
    conversationTitle,
  } = useChat();

  const isEmpty = useMemo(() => messages.length === 0, [messages.length]);

  const handleSuggestionSelect = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <ChatLayout
      conversationTitle={conversationTitle}
      isSidebarOpen={isSidebarOpen}
      conversations={conversations}
      activeConversationId={activeConversationId}
      onToggleSidebar={toggleSidebar}
      onNewChat={startNewChat}
      onSelectConversation={selectConversation}
      onDeleteConversation={deleteConversation}
    >
      <div className="flex h-full flex-col">
        {isEmpty ? (
          <WelcomeState onSelectSuggestion={handleSuggestionSelect} />
        ) : (
          <ChatContainer messages={messages} loading={loading} error={error} />
        )}

        <ChatInput value={input} onChange={setInput} onSend={() => sendMessage()} loading={loading} />
      </div>
    </ChatLayout>
  );
}
