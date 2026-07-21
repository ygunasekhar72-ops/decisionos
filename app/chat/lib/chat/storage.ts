import type { ChatConversation } from '@/app/chat/types/chat';

const DEFAULT_STORAGE_KEY = 'decisionos-chat-conversations';

export interface ConversationRepository {
  load(): ChatConversation[];
  save(conversations: ChatConversation[]): void;
}

export class LocalStorageConversationRepository implements ConversationRepository {
  constructor(private readonly storageKey = DEFAULT_STORAGE_KEY) {}

  load(): ChatConversation[] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const storedValue = window.localStorage.getItem(this.storageKey);
      if (!storedValue) {
        return [];
      }

      const parsed = JSON.parse(storedValue) as ChatConversation[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  save(conversations: ChatConversation[]): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(this.storageKey, JSON.stringify(conversations));
  }
}

export function createConversationTitle(message: string): string {
  const cleaned = message.trim().replace(/\s+/g, ' ');
  return cleaned.length > 40 ? `${cleaned.slice(0, 37)}...` : cleaned || 'New conversation';
}

export function createConversation(): ChatConversation {
  const now = new Date().toISOString();

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: 'New conversation',
    lastMessagePreview: '',
    updatedAt: now,
    createdAt: now,
    messages: [],
  };
}
