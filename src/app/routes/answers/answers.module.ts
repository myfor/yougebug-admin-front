import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswersRoutingModule } from './answers-routing.module';
import { DisabledAnswersComponent } from './disabled-answers/disabled-answers.component';


@NgModule({
  declarations: [DisabledAnswersComponent],
  imports: [
    CommonModule,
    AnswersRoutingModule
  ]
})
export class AnswersModule { }
