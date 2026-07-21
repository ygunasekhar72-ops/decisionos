export type BasicInfo = {
  name: string;
  age: string;
  classLevel: string;
  educationBoard: string;
};

export type AssessmentAnswers = {
  fullName: string;
  age: string;
  currentClass: string;
  educationBoard: string;
  thinkingAnswers: Record<string, string>;
  thinkingCustomAnswers: Record<string, string>;
};

export type StudentProfile = {
  basicInfo: BasicInfo;
  assessmentAnswers: AssessmentAnswers;
  studentProfile: {
    favouriteSubject: string;
    strongestSubject: string;
    thinkingStyle: string;
    academicStrength: string;
    careerGoal: string;
    futureDream: string;
    interests: string[];
    customAnswers: string[];
  };
};
