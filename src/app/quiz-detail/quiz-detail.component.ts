import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Quiz } from '../quiz';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {
  @Input() quiz?: Quiz;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getQuiz();
  }

  getQuiz(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.quizService.getQuiz(id)
      .subscribe(quiz => this.quiz = quiz);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.quiz) {
      this.quizService.updateQuiz(this.quiz)
        .subscribe(() => this.goBack());
    }
  }
}
