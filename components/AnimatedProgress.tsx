type AnimatedProgressProps = {
  progress: number;
};

export function AnimatedProgress({ progress }: AnimatedProgressProps) {
  return (
    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--color-background-secondary)]">
      <div
        className="h-full rounded-full bg-[var(--color-primary)] shadow-[0_0_18px_rgba(64,1,6,0.16)] transition-all duration-700"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
