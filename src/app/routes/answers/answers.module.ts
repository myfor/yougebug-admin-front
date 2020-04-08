import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswersRoutingModule } from './answers-routing.module';
import { AnswersComponent } from './answers/answers.component';
import { AnswerDetailComponent } from './answer-detail/answer-detail.component';


@NgModule({
  declarations: [AnswersComponent, AnswerDetailComponent],
  imports: [
    CommonModule,
    AnswersRoutingModule
  ]
})
export class AnswersModule { }
