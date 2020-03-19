import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';

const questionsRoutes: Routes = [
  { path: '', component: QuestionsListComponent },
  { path: ':id', component: QuestionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(questionsRoutes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
