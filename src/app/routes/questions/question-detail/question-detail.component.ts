import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { QuestionsService, QuestionDetail } from '../../../services/questions/questions.service';
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

  detail: QuestionDetail = this.question.emtpyQuestionDetail;

  constructor(
    private question: QuestionsService,
    private answerService: AnswersService,
    private route: ActivatedRoute,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
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
  disabled(reason: string) {
    if (!reason) {
      this.common.snackOpen('必须输入禁用/退回理由');
      return;
    }
    this.question.disabledQuestion(this.id, reason)
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

  //  删除追问
  deleteComment(commentId: number) {
    this.question.deleteComment(commentId).subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
      } else {
        this.detail.comments = this.detail.comments.filter(c => c.key !== commentId);
      }
    });
  }
}
