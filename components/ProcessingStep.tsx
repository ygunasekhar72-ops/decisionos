type ProcessingStepProps = {
  label: string;
  isCompleted: boolean;
  isActive: boolean;
};

export function ProcessingStep({ label, isCompleted, isActive }: ProcessingStepProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-[20px] border px-4 py-3 text-sm transition-all duration-500 ${
        isCompleted
          ? 'border-[var(--color-success)]/35 bg-[color:var(--color-success)]/10 text-[var(--color-success)]'
          : isActive
            ? 'border-[var(--color-accent)]/70 bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] shadow-[0_10px_34px_rgba(64,1,6,0.06)]'
            : 'border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-secondary)]'
      }`}
    >
      <span>{label}</span>
      <span className={`text-xs font-semibold ${isCompleted ? 'text-[var(--color-success)]' : isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
        {isCompleted ? 'Done' : isActive ? 'Working' : 'Queued'}
      </span>
    </div>
  );
}
