'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatedProgress } from '@/components/AnimatedProgress';
import { ProcessingTimeline } from '@/components/ProcessingTimeline';
import { useStudentContext } from '@/context/StudentContext';
import { buildStudentProfile } from '@/lib/studentProfileBuilder';

const processingSteps = [
  'Basic Information Processed',
  'Interests Identified',
  'Thinking Style Understood',
  'Academic Strengths Found',
  'Career Goals Mapped',
  'Creating Student Profile',
  'Preparing AI Conversation',
];

export default function BuildingProfilePage() {
  const router = useRouter();
  const { onboardingAnswers, generateProfile } = useStudentContext();
  const [completedSteps, setCompletedSteps] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const profile = useMemo(() => buildStudentProfile(onboardingAnswers), [onboardingAnswers]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCompletedSteps((prev) => {
        if (prev >= processingSteps.length) {
          window.clearInterval(timer);
          setIsReady(true);
          return processingSteps.length;
        }

        return prev + 1;
      });
    }, 700);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    generateProfile();

    const timeout = window.setTimeout(() => {
      router.push('/chat');
    }, 800);

    return () => window.clearTimeout(timeout);
  }, [generateProfile, isReady, router]);

  const progressPercent = Math.min((completedSteps / processingSteps.length) * 100, 100);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-background)] px-4 py-10 text-[var(--color-text-primary)] sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,185,145,0.2),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(64,1,6,0.06),transparent_24%)]" />
      <div className="absolute left-8 top-24 h-44 w-44 rounded-full bg-[var(--color-accent)]/20 blur-3xl animate-blob" />
      <div className="absolute right-10 bottom-20 h-56 w-56 rounded-full bg-[var(--color-primary)]/10 blur-3xl animate-blob animation-delay-2000" />

      <div className="relative z-10 w-full max-w-3xl">
        <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-8 shadow-[var(--shadow-soft)] sm:px-10 sm:py-10">
          <div className="animate-fade-in-down">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs uppercase tracking-[0.35em] text-[var(--color-text-secondary)]">
                Step 4 of 5
              </span>
              <span className="text-sm font-semibold text-[var(--color-primary)]">{Math.round(progressPercent)}%</span>
            </div>
            <AnimatedProgress progress={progressPercent} />
          </div>

          <div className="mt-10 text-center animate-fade-in-up delay-200">
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
              Building Your Personal AI Mentor
            </h1>
            <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)] sm:text-lg">
              We&apos;re understanding your interests, strengths, and future goals to personalize every conversation.
            </p>
          </div>

          <div className="mt-10 rounded-[28px] border border-[var(--color-border)] bg-[var(--color-background)] p-5 shadow-[0_14px_40px_rgba(64,1,6,0.05)] sm:p-8 animate-fade-in-up delay-300">
            <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
              <span>Preparing your profile</span>
              <span className="text-[var(--color-primary)]">AI context ready</span>
            </div>

            <div className="mt-6">
              <ProcessingTimeline steps={processingSteps} completedSteps={completedSteps} />
            </div>

            <div className="mt-6 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-sm text-[var(--color-text-secondary)]">
              <p className="font-medium text-[var(--color-text-primary)]">Student Profile Snapshot</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-[var(--color-text-secondary)]">Name</p>
                  <p className="mt-1 text-[var(--color-text-primary)]">{profile.basicInfo.name || 'Student'}</p>
                </div>
                <div>
                  <p className="text-[var(--color-text-secondary)]">Goal</p>
                  <p className="mt-1 text-[var(--color-text-primary)]">{profile.studentProfile.careerGoal}</p>
                </div>
                <div>
                  <p className="text-[var(--color-text-secondary)]">Strength</p>
                  <p className="mt-1 text-[var(--color-text-primary)]">{profile.studentProfile.strongestSubject}</p>
                </div>
                <div>
                  <p className="text-[var(--color-text-secondary)]">Thinking Style</p>
                  <p className="mt-1 text-[var(--color-text-primary)]">{profile.studentProfile.thinkingStyle}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
