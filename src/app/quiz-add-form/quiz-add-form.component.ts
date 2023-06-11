import { Component } from '@angular/core';
import { Quiz } from '../quiz';

@Component({
  selector: 'app-quiz-add-form',
  templateUrl: './quiz-add-form.component.html',
  styleUrls: ['./quiz-add-form.component.scss']
})
export class QuizAddFormComponent {
  model = new Quiz(18, 'New Quiz', []);

  submitted = false;

  onSubmit() { this.submitted = true; }

  newQuiz() {
    this.model = new Quiz(42, '', []);
  }
}
