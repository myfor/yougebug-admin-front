import { Component, OnInit } from '@angular/core';
import { AnswersService, AnswerItemAll } from '../../../services/answers.service';
import { CommonService, State } from 'app/services/common.service';

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
  dataSource: AnswerItemAll[] = [];

  columnsToDisplay = ['questionTitle', 'content', 'votes', 'createDate', 'answererName', 'state', 'action' ];

  constructor(
    private answer: AnswersService,
    private common: CommonService
  ) { }

  ngOnInit() {
  }

  search(questionTitle: string) {
    this.questionTitle = questionTitle;
    this.getList();
  }

  private getList() {
    this.answer.getAllDisabledAnswers(this.index, this.size, this.questionTitle)
    .subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
      } else {
        this.totalSize = r.data.totalRows;
        this.dataSource = r.data.list;
      }
    });
  }
}
