import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswersComponent } from './answers/answers.component';
import { AnswerDetailComponent } from './answer-detail/answer-detail.component';

const ANSWERS_ROUTES: Routes = [
  { path: '', component: AnswersComponent, pathMatch: 'full' },
  { path: ':id', component: AnswerDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ANSWERS_ROUTES)],
  exports: [RouterModule]
})
export class AnswersRoutingModule { }
