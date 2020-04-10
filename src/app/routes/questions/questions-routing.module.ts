import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { ReportsComponent } from './reports/reports.component';

const QUESTIONS_ROUTERS: Routes = [
  { path: 'reports', component: ReportsComponent },
  { path: 'list', component: QuestionsListComponent, pathMatch: 'full' },
  { path: ':id', component: QuestionDetailComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(QUESTIONS_ROUTERS)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
