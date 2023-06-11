import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../message.service';
import { Quiz } from '../quiz';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  quizzes!: Quiz[];
  selectedQuiz?: Quiz;

  constructor(private quizService: QuizService,
    private messageService: MessageService) { }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.getQuizzes();
  }

  getQuizzes(): void {
    this.subs.push(this.quizService.getQuizzes()
      .subscribe(quiz =>
        this.quizzes = quiz));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.quizService.addQuiz({ name } as Quiz)
      .subscribe(quiz => {
        this.quizzes.push(quiz);
      });
  }

  delete(quiz: Quiz): void {
    this.quizzes = this.quizzes.filter(h => h !== quiz);
    this.quizService.deleteQuiz(quiz.id).subscribe();
  }
}
