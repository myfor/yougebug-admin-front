import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { AnswersItemComponent } from './answers-item/answers-item.component';


@NgModule({
  declarations: [QuestionsListComponent, QuestionDetailComponent, AnswersItemComponent],
  imports: [
    SharedModule,
    QuestionsRoutingModule
  ]
})
export class QuestionsModule { }
