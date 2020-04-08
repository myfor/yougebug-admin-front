import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswersComponent } from './answers/answers.component';

const ANSWERS_ROUTES: Routes = [
  { path: '', component: AnswersComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(ANSWERS_ROUTES)],
  exports: [RouterModule]
})
export class AnswersRoutingModule { }
