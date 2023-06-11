import { Component } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Quiz } from '../quiz';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-search',
  templateUrl: './quiz-search.component.html',
  styleUrls: ['./quiz-search.component.scss']
})
export class QuizSearchComponent {
  quizzes$!: Observable<Quiz[]>;
  private searchTerms = new Subject<string>();

  constructor(private quizService: QuizService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.quizzes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.quizService.searchQuizzes(term)),
    );
  }
}
