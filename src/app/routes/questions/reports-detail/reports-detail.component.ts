import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { QuestionsService, ReportQuestionDetail } from '../../../services/questions.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-reports-detail',
  templateUrl: './reports-detail.component.html',
  styleUrls: ['./reports-detail.component.css']
})
export class ReportsDetailComponent implements OnInit {

  id = 0;
  index = 1;
  detail: ReportQuestionDetail = this.question.emptyReportQuestionDetail;

  constructor(
    private common: CommonService,
    private question: QuestionsService
  ) { }

  ngOnInit() {
  }

  getDetail() {
    this.question.getReportQuestionDetail(this.id, this.index).subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
      } else {
        this.detail = r.data;
      }
    });
  }

  pageChange(pager: PageEvent) {
    this.index = pager.pageIndex + 1;
  }
}
