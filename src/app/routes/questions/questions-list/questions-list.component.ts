import { Component, OnInit } from '@angular/core';
import { QuestionsService, QuestionItem } from '../../../services/questions.service';
import { PageEvent, MatSlideToggleChange } from '@angular/material';
import { CommonService } from 'app/services/common.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  size = 0;
  totalSize = 0;
  dataSource: QuestionItem[] = [
    { id: 0, title: 'title', description: 'description', state: 0, createDate: '2020[20[20' }
  ];

  columnsToDisplay = ['title', 'description', 'createDate', 'action' ];

  constructor(
    private question: QuestionsService,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.getQuestionsList(1);
  }

  pageChange(page: PageEvent) {
    this.getQuestionsList(page.pageIndex + 1);
  }

  private getQuestionsList(index: number) {
    this.question.getQuestions(index).subscribe(result => {
      if (result.isFault) {
        this.common.snackOpen(result.message, 2000);
        return;
      }
      this.dataSource = result.data.list;
      this.size = result.data.rows;
      this.totalSize = result.data.totalRows;
    });
  }

  enabledOrDisabled(value: MatSlideToggleChange) {
    if (value.checked) {
      this.question.enabledQuestion(parseInt(value.source.id, null));
    } else {
      this.question.disabledQuestion(parseInt(value.source.id, null));
    }
  }
}
