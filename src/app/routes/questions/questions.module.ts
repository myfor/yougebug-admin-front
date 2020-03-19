import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';


@NgModule({
  declarations: [QuestionsListComponent, QuestionDetailComponent],
  imports: [
    SharedModule,
    QuestionsRoutingModule
  ]
})
export class QuestionsModule { }
