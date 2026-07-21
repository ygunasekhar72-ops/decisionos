import type { ChatSuggestion } from '@/app/chat/types/chat';

export const chatSuggestions: ChatSuggestion[] = [
  { id: 'stream', label: 'Which stream suits me best?', prompt: 'Which stream suits me best?' },
  { id: 'careers', label: 'Recommend careers.', prompt: 'Recommend careers.' },
  { id: 'roadmap', label: 'Create my roadmap.', prompt: 'Create my roadmap.' },
  { id: 'compare', label: 'Compare MPC and MEC.', prompt: 'Compare MPC and MEC.' },
  { id: 'skills', label: 'What skills should I learn?', prompt: 'What skills should I learn?' },
];

const fallbackReply =
  "I can help you think through your options carefully and turn them into a clear next step. Tell me what you want to explore, and I’ll shape the answer around your profile and goals.";

export function createAssistantReply(userMessage: string): string {
  const message = userMessage.toLowerCase();

  if (message.includes('stream')) {
    return 'A strong stream choice usually balances your strengths, interests, and future flexibility. I’d recommend we compare your academic fit, your curiosity, and the kinds of careers you might enjoy before narrowing it down.';
  }

  if (message.includes('career') || message.includes('careers')) {
    return 'Career exploration works best when we connect your interests to real-world possibilities. I can map a few thoughtful options and show you which paths align best with your temperament and strengths.';
  }

  if (message.includes('roadmap') || message.includes('plan')) {
    return 'A roadmap becomes much easier when it is built around your current level, your goals, and the habits that genuinely help you progress. I can help you design a calm, practical plan for the next few months.';
  }

  if (message.includes('mpc') || message.includes('mec')) {
    return 'Comparing streams is less about picking the “best” one and more about finding the one that fits how you think and what kind of future you imagine. I can break down the trade-offs clearly and help you decide with confidence.';
  }

  if (message.includes('skill') || message.includes('skills')) {
    return 'The right skills are usually the ones that strengthen both your confidence and your future options. I can recommend a focused set that matches your profile and supports the path you are leaning toward.';
  }

  return fallbackReply;
}
