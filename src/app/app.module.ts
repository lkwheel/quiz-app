import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InMemoryDataService } from './in-memory-data.service';
import { MessagesComponent } from './messages/messages.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuizSearchComponent } from './quiz-search/quiz-search.component';
import { QuizAddFormComponent } from './quiz-add-form/quiz-add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizzesComponent,
    QuizDetailComponent,
    MessagesComponent,
    DashboardComponent,
    QuizSearchComponent,
    QuizAddFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
