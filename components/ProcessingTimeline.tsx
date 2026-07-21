import { ProcessingStep } from './ProcessingStep';

type ProcessingTimelineProps = {
  steps: string[];
  completedSteps: number;
};

export function ProcessingTimeline({ steps, completedSteps }: ProcessingTimelineProps) {
  return (
    <div className="grid gap-3">
      {steps.map((step, index) => {
        const isCompleted = index < completedSteps;
        const isActive = index === completedSteps;

        return (
          <ProcessingStep
            key={step}
            label={step}
            isCompleted={isCompleted}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
}
