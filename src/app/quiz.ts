import { QuizQuestion } from "./quiz-question";

export class Quiz {
  constructor(
    public id: number,
    public name: string,
    public quizQuestions: QuizQuestion[]) { }
}
