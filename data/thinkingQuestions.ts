export type ThinkingQuestion = {
  id: string;
  question: string;
  options: string[];
  allowCustomAnswer: boolean;
  category: string;
};

export const thinkingQuestions: ThinkingQuestion[] = [
  {
    id: 'interests',
    question: 'What kind of topics naturally catch your attention?',
    options: [
      'Science and technology',
      'Creative and design work',
      'Business and leadership',
      'Something else...',
    ],
    allowCustomAnswer: true,
    category: 'Interests',
  },
  {
    id: 'thinking-style',
    question: 'When you learn something new, what helps you most?',
    options: [
      'Clear examples and step-by-step guidance',
      'Big-picture ideas and patterns',
      'Real-world practice and experimentation',
      'Something else...',
    ],
    allowCustomAnswer: true,
    category: 'Thinking Style',
  },
  {
    id: 'academic-strength',
    question: 'Which subject feels most natural to you right now?',
    options: [
      'Math and logic',
      'Languages and writing',
      'Science and problem solving',
      'Something else...',
    ],
    allowCustomAnswer: true,
    category: 'Academic Strength',
  },
  {
    id: 'career-goals',
    question: 'What kind of future feels exciting to you?',
    options: [
      'Building a strong career in a professional field',
      'Creating something original and impactful',
      'Helping people and solving real problems',
      'Something else...',
    ],
    allowCustomAnswer: true,
    category: 'Career Goals',
  },
  {
    id: 'career-preference',
    question: 'Which work style sounds most appealing to you?',
    options: [
      'Structured and goal-driven',
      'Flexible and creative',
      'Collaborative and people-focused',
      'Something else...',
    ],
    allowCustomAnswer: true,
    category: 'Career Preference',
  },
];
