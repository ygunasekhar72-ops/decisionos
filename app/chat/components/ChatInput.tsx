'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { AttachmentToolbar } from '@/app/chat/components/AttachmentToolbar';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  loading: boolean;
}

export const ChatInput = memo(function ChatInput({ value, onChange, onSend, loading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [attachmentMessage, setAttachmentMessage] = useState('');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  const handleAttachment = (file?: File | null) => {
    if (file) {
      setAttachmentMessage(`Attachment ready: ${file.name}`);
      return;
    }

    setAttachmentMessage('Attachment support is ready. Choose a file or photo to attach it to this conversation.');
  };

  const handleCamera = () => {
    setAttachmentMessage('Camera access is ready. Your device camera can be used to capture a photo for the next step.');
  };

  return (
    <div className="border-t border-[var(--color-border)] bg-[var(--color-background)]/90 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card)] p-3 shadow-[0_16px_45px_rgba(64,1,6,0.06)]">
        <label className="sr-only" htmlFor="chat-input">
          Ask DecisionOS Mentor anything
        </label>
        <textarea
          id="chat-input"
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask DecisionOS Mentor anything..."
          rows={1}
          disabled={loading}
          className="max-h-40 min-h-[56px] w-full resize-none rounded-[20px] bg-transparent px-4 py-3 text-base text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)] disabled:cursor-not-allowed"
        />

        {attachmentMessage ? (
          <div className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-secondary)]">
            {attachmentMessage}
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3 px-1 pb-1">
          <div className="flex items-center gap-2">
            <AttachmentToolbar onAddFile={handleAttachment} onOpenCamera={handleCamera} />
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-3 text-sm text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)]"
              aria-label="Record audio"
            >
              Record
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--color-text-secondary)]">{value.length}/1800</span>
            <button
              type="button"
              onClick={onSend}
              disabled={loading || value.trim().length === 0}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Thinking...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
