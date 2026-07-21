import type { AssessmentAnswers, StudentProfile } from '@/types/student';

export const buildStudentProfile = (answers: AssessmentAnswers): StudentProfile => {
  const customAnswers = Object.values(answers.thinkingCustomAnswers).filter(Boolean);
  const thinkingValues = Object.values(answers.thinkingAnswers);

  const favouriteSubject =
    thinkingValues.find((value) => value.includes('Science')) ||
    thinkingValues.find((value) => value.includes('Math')) ||
    thinkingValues.find((value) => value.includes('Language')) ||
    'General curiosity';

  const strongestSubject =
    thinkingValues.find((value) => value.includes('logic')) ||
    thinkingValues.find((value) => value.includes('problem')) ||
    thinkingValues.find((value) => value.includes('writing')) ||
    'Adaptable learning';

  const thinkingStyle =
    thinkingValues.find((value) => value.includes('step')) ||
    thinkingValues.find((value) => value.includes('pattern')) ||
    thinkingValues.find((value) => value.includes('practice')) ||
    'Balanced and reflective';

  const careerGoal =
    thinkingValues.find((value) => value.includes('career')) ||
    thinkingValues.find((value) => value.includes('impact')) ||
    thinkingValues.find((value) => value.includes('people')) ||
    'A meaningful future';

  const futureDream =
    thinkingValues.find((value) => value.includes('create')) ||
    thinkingValues.find((value) => value.includes('build')) ||
    thinkingValues.find((value) => value.includes('help')) ||
    'Growing into a purposeful professional';

  return {
    basicInfo: {
      name: answers.fullName,
      age: answers.age,
      classLevel: answers.currentClass,
      educationBoard: answers.educationBoard,
    },
    assessmentAnswers: answers,
    studentProfile: {
      favouriteSubject: favouriteSubject || 'General curiosity',
      strongestSubject: strongestSubject || 'Adaptable learning',
      thinkingStyle: thinkingStyle || 'Balanced and reflective',
      academicStrength: strongestSubject || 'Adaptive problem solving',
      careerGoal: careerGoal || 'A meaningful future',
      futureDream: futureDream || 'Growing into a purposeful professional',
      interests: thinkingValues.filter(Boolean),
      customAnswers,
    },
  };
};
