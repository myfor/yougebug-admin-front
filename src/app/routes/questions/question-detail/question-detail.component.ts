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

  detail: QuestionDetail;
  //  = {
  //   title: 'title哈哈',
  //   description: `
  //   descpiptionaaaaaa
  //   descpiptionaaaaaa
  //   descpiptionaaaaaa
  //   descpiptionaaaaaa
  //   descpiptionaaaaaa
  //   descpiptionaaaaaa
  //   descpiptionaaaaaa
  //   descpiptionaaaaaa
  //   descpiptionaaaaaa
  //   `,
  //   state: {
  //     key: 1,
  //     value: '启用'
  //   },
  //   createDate: '2020-02-02',
  //   tags: ['aaaaa', 'bbbbbb'],
  //   votes: 120,
  //   views: 100,
  //   askerId: 1,
  //   askerName: 'username',
  //   askerThumbnail: 'assets/images/avatar.png',
  //   answers: {
  //     index: 1,
  //     rows: 10,
  //     totalRows: 100,
  //     totalPages: 10,
  //     list: [
  //       {
  //         id: 1,
  //         votes: 90,
  //         content: 'dot not know',
  //         createDate: '2020[09[09',
  //         userId: 1,
  //         userName: 'answer user',
  //         avatar: 'assets/images/avatar.png',
  //         state: {
  //           key: 1,
  //           value: '启用'
  //         }
  //       },
  //       {
  //         id: 2,
  //         votes: 90,
  //         content: 'dot not know',
  //         createDate: '2020[09[09',
  //         userId: 1,
  //         userName: 'answer user',
  //         avatar: 'assets/images/avatar.png',
  //         state: {
  //           key: 0,
  //           value: '禁用'
  //         }
  //       }
  //     ]
  //   }
  // };

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
    this.detail.answers.index = pager.pageIndex + 1;
    this.answerService.getAnswers(this.id, this.detail.answers.index, 20)
    .subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
        return;
      } else {
        this.detail.answers = r.data;
      }
    });
  }
}
