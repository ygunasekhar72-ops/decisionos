'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { AssessmentAnswers, StudentProfile } from '@/types/student';
import { buildStudentProfile } from '@/lib/studentProfileBuilder';

type StudentContextValue = {
  onboardingAnswers: AssessmentAnswers;
  studentProfile: StudentProfile | null;
  setOnboardingAnswers: (answers: AssessmentAnswers) => void;
  generateProfile: () => StudentProfile;
};

const initialAnswers: AssessmentAnswers = {
  fullName: '',
  age: '',
  currentClass: 'Class 10',
  educationBoard: 'CBSE',
  thinkingAnswers: {},
  thinkingCustomAnswers: {},
};

const StudentContext = createContext<StudentContextValue | undefined>(undefined);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [onboardingAnswers, setOnboardingAnswers] = useState<AssessmentAnswers>(initialAnswers);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);

  const generateProfile = useCallback(() => {
    const profile = buildStudentProfile(onboardingAnswers);
    setStudentProfile(profile);
    return profile;
  }, [onboardingAnswers]);

  const value = useMemo(
    () => ({
      onboardingAnswers,
      studentProfile,
      setOnboardingAnswers,
      generateProfile,
    }),
    [onboardingAnswers, studentProfile, generateProfile]
  );

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudentContext() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within StudentProvider');
  }
  return context;
}
