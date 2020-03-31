import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';

const QUESTIONS_ROUTERS: Routes = [
  { path: '', component: QuestionsListComponent },
  { path: ':id', component: QuestionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(QUESTIONS_ROUTERS)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
