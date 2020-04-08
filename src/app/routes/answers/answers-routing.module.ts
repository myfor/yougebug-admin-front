import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisabledAnswersComponent } from './disabled-answers/disabled-answers.component';

const ANSWERS_ROUTES: Routes = [
  { path: 'disabled', component: DisabledAnswersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ANSWERS_ROUTES)],
  exports: [RouterModule]
})
export class AnswersRoutingModule { }
