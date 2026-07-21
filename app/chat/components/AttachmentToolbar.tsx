'use client';

import { memo, useRef, useState } from 'react';

interface AttachmentToolbarProps {
  onAddFile: (file?: File | null) => void;
  onOpenCamera: () => void;
}

export const AttachmentToolbar = memo(function AttachmentToolbar({ onAddFile, onOpenCamera }: AttachmentToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileTrigger = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setIsOpen(false);
    onAddFile(file);
    event.target.value = '';
  };

  const handleCamera = async () => {
    setIsOpen(false);
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      onOpenCamera();
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      onOpenCamera();
    } catch {
      onOpenCamera();
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)]"
        aria-label="Open attachments"
      >
        +
      </button>

      {isOpen ? (
        <div className="absolute bottom-12 left-0 z-20 flex min-w-52 flex-col gap-2 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)] p-2 shadow-[0_16px_40px_rgba(64,1,6,0.08)]">
          <button
            type="button"
            onClick={() => {
              handleFileTrigger();
            }}
            className="rounded-[16px] px-3 py-2 text-left text-sm text-[var(--color-text-primary)] transition hover:bg-[var(--color-background)]"
          >
            Upload file or photo
          </button>
          <button
            type="button"
            onClick={() => {
              void handleCamera();
            }}
            className="rounded-[16px] px-3 py-2 text-left text-sm text-[var(--color-text-primary)] transition hover:bg-[var(--color-background)]"
          >
            Enable camera access
          </button>
          <input ref={fileInputRef} type="file" accept="image/*,.pdf,.doc,.docx,.txt" className="hidden" onChange={handleFileSelection} />
        </div>
      ) : null}
    </div>
  );
});
