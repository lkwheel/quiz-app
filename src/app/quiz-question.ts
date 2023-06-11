import { QuizQuestionAnswer } from "./quiz-question-answer";

export interface QuizQuestion {
  id: number;
  prompt: string;
  quizQuestionAnswers: QuizQuestionAnswer[];
}
