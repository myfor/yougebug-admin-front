import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsListComponent } from './questions-list/questions-list.component';


@NgModule({
  declarations: [QuestionsListComponent],
  imports: [
    SharedModule,
    QuestionsRoutingModule
  ]
})
export class QuestionsModule { }
