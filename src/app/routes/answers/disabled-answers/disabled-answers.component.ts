import { Component, OnInit } from '@angular/core';
import { AnswerItemAll } from '../../../services/answers.service';
import { CommonService, State } from 'app/services/common.service';

@Component({
  selector: 'app-disabled-answers',
  templateUrl: './disabled-answers.component.html',
  styleUrls: ['./disabled-answers.component.css']
})
export class DisabledAnswersComponent implements OnInit {

  dataSource: AnswerItemAll[] = [];

  columnsToDisplay = ['questionTitle', 'content', 'votes', 'createDate', 'answererName', 'state', 'action' ];

  constructor() { }

  ngOnInit() {
  }

  search(questionTitle: string) {

  }
}
