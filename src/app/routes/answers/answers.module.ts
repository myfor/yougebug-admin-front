import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { AnswersRoutingModule } from './answers-routing.module';
import { AnswersComponent } from './answers/answers.component';
import { AnswerDetailComponent } from './answer-detail/answer-detail.component';


@NgModule({
  declarations: [AnswersComponent, AnswerDetailComponent],
  imports: [
    SharedModule,
    AnswersRoutingModule
  ]
})
export class AnswersModule { }
