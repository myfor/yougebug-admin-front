import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswersService, AnswerDetail } from '../../../services/answers.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.css']
})
export class AnswerDetailComponent implements OnInit {

  id = 0;
  detail: AnswerDetail = this.answers.emptyAnswerDetail;

  constructor(
    private route: ActivatedRoute,
    private answers: AnswersService,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), null);

    this.getDetail();
  }

  private getDetail() {
    this.answers.getAnswerDetail(this.id)
      .subscribe(r => {
        if (r.isFault) {
          this.common.snackOpen(r.message, 3000);
        } else {
          this.detail = r.data;
        }
      });
  }
}
