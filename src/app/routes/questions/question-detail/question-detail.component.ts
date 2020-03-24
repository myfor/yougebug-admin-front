import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { QuestionsService, QuestionDetail } from '../../../services/questions.service';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';
import { AnswersService } from '../../../services/answers.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  id: number;

  detail: QuestionDetail
  = {
    title: '',
    description: ``,
    state: {
      key: 0,
      value: ''
    },
    createDate: '0001-01-01',
    tags: [],
    votes: 0,
    views: 0,
    user: {
      id: 0,
      account: '',
      avatar: 'assets/images/avatar.png'
    },
    page: {
      index: 1,
      size: 0,
      totalRows: 0,
      totalPages: 0,
      list: []
    }
  };

  constructor(
    private question: QuestionsService,
    private answerService: AnswersService,
    private route: ActivatedRoute,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), null);
    this.getDetail();
  }

  private getDetail() {
    this.question.getQuestion(this.id)
    .subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message);
        return;
      } else {
        this.detail = r.data;
      }
    });
  }

  //  启用
  enabled() {
    this.question.enabledQuestion(this.id)
    .subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
        return;
      } else {
        this.common.snackOpen('启用成功', 3000);
        this.detail.state.key = 1;
        this.detail.state.value = '启用';
      }
    });
  }

  //  禁用
  disabled() {
    this.question.disabledQuestion(this.id)
    .subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
        return;
      } else {
        this.common.snackOpen('禁用成功', 3000);
        this.detail.state.key = 0;
        this.detail.state.value = '禁用';
      }
    });
  }

  pageChange(pager: PageEvent) {
    this.detail.page.index = pager.pageIndex + 1;
    this.answerService.getAnswers(this.id, this.detail.page.index, 10)
    .subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
        return;
      } else {
        this.detail.page = r.data;
      }
    });
  }
}
