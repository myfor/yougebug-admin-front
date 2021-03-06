import { Component, OnInit } from '@angular/core';
import { AnswersService, AnswerItemAll } from '../../../services/answers.service';
import { CommonService } from 'app/services/common.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  index = 1;
  size = 20;
  totalSize = 0;
  questionTitle = '';
  selectedState = '';

  notData = false;

  dataSource: AnswerItemAll[] = [];

  columnsToDisplay = ['questionTitle', 'content', 'votes', 'createDate', 'answererName', 'state', 'action' ];

  constructor(
    private answer: AnswersService,
    private common: CommonService
  ) { }

  ngOnInit() {
  }

  search(questionTitle: string, state: string) {
    this.questionTitle = questionTitle;
    this.selectedState = state;
    this.getList();
  }

  private getList() {
    if (!this.selectedState) {
      this.dataSource = [];
      return;
    }
    this.answer.getAllAnswers(this.index, this.size, this.selectedState, this.questionTitle)
    .subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
      } else {
        this.totalSize = r.data.totalRows;
        this.dataSource = r.data.list;

        this.notData = this.totalSize === 0;
      }
    });
  }

  pageChange(page: PageEvent) {
    this.index = page.pageIndex + 1;
    this.getList();
  }
}
