'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createAssistantReply, chatSuggestions } from '@/app/chat/lib/chat';
import { createConversation, createConversationTitle, LocalStorageConversationRepository } from '@/app/chat/lib/chat/storage';
import type { ChatConversation, ChatMessage, ChatSuggestion } from '@/app/chat/types/chat';

const createMessageId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const repository = new LocalStorageConversationRepository();

export function useChat() {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedConversations = repository.load();
    setConversations(storedConversations);

    if (storedConversations.length > 0) {
      const mostRecent = storedConversations[0];
      setActiveConversationId(mostRecent.id);
      setMessages(mostRecent.messages);
    } else {
      const freshConversation = createConversation();
      setConversations([freshConversation]);
      setActiveConversationId(freshConversation.id);
      setMessages(freshConversation.messages);
    }
  }, []);

  const persistConversations = useCallback((nextConversations: ChatConversation[]) => {
    setConversations(nextConversations);
    repository.save(nextConversations);
  }, []);

  const selectConversation = useCallback((conversationId: string) => {
    const selectedConversation = conversations.find((conversation) => conversation.id === conversationId);
    if (!selectedConversation) {
      return;
    }

    setActiveConversationId(conversationId);
    setMessages(selectedConversation.messages);
    setInput('');
    setError(null);
    setLoading(false);
  }, [conversations]);

  const deleteConversation = useCallback(
    (conversationId: string) => {
      const nextConversations = conversations.filter((conversation) => conversation.id !== conversationId);

      if (nextConversations.length === 0) {
        const freshConversation = createConversation();
        const persistedConversations = [freshConversation];
        setActiveConversationId(freshConversation.id);
        setMessages([]);
        setInput('');
        setError(null);
        setLoading(false);
        persistConversations(persistedConversations);
        return;
      }

      const fallbackConversation = nextConversations[0];
      const shouldSwitchActive = activeConversationId === conversationId;

      if (shouldSwitchActive) {
        setActiveConversationId(fallbackConversation.id);
        setMessages(fallbackConversation.messages);
      }

      setInput('');
      setError(null);
      setLoading(false);
      persistConversations(nextConversations);
    },
    [activeConversationId, conversations, persistConversations]
  );

  const sendMessage = useCallback(
    async (draft?: string) => {
      const value = (draft ?? input).trim();
      if (!value || loading) {
        return;
      }

      let conversation = conversations.find((item) => item.id === activeConversationId);
      if (!conversation) {
        conversation = createConversation();
      }

      const userMessage: ChatMessage = {
        id: createMessageId(),
        role: 'user',
        content: value,
        createdAt: new Date().toISOString(),
      };

      const nextMessages = [...conversation.messages, userMessage];
      const nextConversation: ChatConversation = {
        ...conversation,
        title: conversation.messages.length === 0 ? createConversationTitle(value) : conversation.title,
        lastMessagePreview: value,
        updatedAt: new Date().toISOString(),
        messages: nextMessages,
      };

      const nextConversations = [nextConversation, ...conversations.filter((item) => item.id !== conversation.id)].sort(
        (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
      );

      setActiveConversationId(nextConversation.id);
      setMessages(nextMessages);
      setInput('');
      setLoading(true);
      setError(null);
      persistConversations(nextConversations);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: value }),
        });

        const data = (await response.json()) as { success?: boolean; reply?: string; error?: string };

        if (!response.ok || !data.success) {
          throw new Error(data.error ?? 'I could not reach the assistant right now. Please try again.');
        }

        const assistantReply = data.reply ?? 'I am here and ready to help.';
        const assistantMessage: ChatMessage = {
          id: createMessageId(),
          role: 'assistant',
          content: assistantReply,
          createdAt: new Date().toISOString(),
        };

        const updatedMessages = [...nextMessages, assistantMessage];
        const updatedConversation: ChatConversation = {
          ...nextConversation,
          lastMessagePreview: assistantReply,
          updatedAt: new Date().toISOString(),
          messages: updatedMessages,
        };

        const updatedConversations = [updatedConversation, ...nextConversations.filter((item) => item.id !== nextConversation.id)].sort(
          (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
        );

        setMessages(updatedMessages);
        persistConversations(updatedConversations);
      } catch (err) {
        const fallbackMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
        const assistantMessage: ChatMessage = {
          id: createMessageId(),
          role: 'assistant',
          content: `Sorry — ${fallbackMessage}`,
          createdAt: new Date().toISOString(),
        };

        const updatedMessages = [...nextMessages, assistantMessage];
        const updatedConversation: ChatConversation = {
          ...nextConversation,
          lastMessagePreview: assistantMessage.content,
          updatedAt: new Date().toISOString(),
          messages: updatedMessages,
        };

        const updatedConversations = [updatedConversation, ...nextConversations.filter((item) => item.id !== nextConversation.id)].sort(
          (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
        );

        setMessages(updatedMessages);
        setError(fallbackMessage);
        persistConversations(updatedConversations);
      } finally {
        setLoading(false);
      }
    },
    [activeConversationId, conversations, input, loading, persistConversations]
  );

  const startNewChat = useCallback(() => {
    const freshConversation = createConversation();
    const nextConversations = [freshConversation, ...conversations].sort(
      (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
    );

    setActiveConversationId(freshConversation.id);
    setMessages([]);
    setInput('');
    setError(null);
    setLoading(false);
    persistConversations(nextConversations);
  }, [conversations, persistConversations]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const suggestionList = useMemo<ChatSuggestion[]>(() => chatSuggestions, []);

  const conversationTitle = useMemo(() => {
    if (messages.length === 0) {
      return 'New conversation';
    }

    const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user');
    if (!latestUserMessage) {
      return 'DecisionOS Mentor';
    }

    return latestUserMessage.content.slice(0, 34).trim();
  }, [messages]);

  return {
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
    suggestionList,
    conversationTitle,
  };
}
