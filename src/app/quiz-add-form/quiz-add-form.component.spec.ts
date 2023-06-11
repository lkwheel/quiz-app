import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAddFormComponent } from './quiz-add-form.component';

describe('QuizAddFormComponent', () => {
  let component: QuizAddFormComponent;
  let fixture: ComponentFixture<QuizAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
