export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  lastMessagePreview: string;
  updatedAt: string;
  createdAt: string;
  messages: ChatMessage[];
}

export interface ChatSuggestion {
  id: string;
  label: string;
  prompt: string;
}

export interface ChatState {
  messages: ChatMessage[];
  input: string;
  loading: boolean;
  error: string | null;
  conversationId: string;
  isSidebarOpen: boolean;
}
