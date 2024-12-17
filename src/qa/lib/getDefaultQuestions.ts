import { QUESTIONS } from '../consts/questions.const';

export function getDefaultQuestions() {
  return QUESTIONS.map((q) => ({ question: q, answer: '' }));
}
