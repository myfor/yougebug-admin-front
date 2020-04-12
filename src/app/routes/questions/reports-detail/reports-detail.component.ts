import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';
import { QuestionsService, ReportQuestionDetail, Report } from '../../../services/questions.service';
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

  totalReportSize = 0;
  reports: Report[] = [];

  constructor(
    private common: CommonService,
    private question: QuestionsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getDetail();
    this.getReports();
  }

  private getDetail() {
    this.question.getReportQuestionDetail(this.id).subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
      } else {
        this.detail = r.data;
      }
    });
  }

  private getReports() {
    this.question.getReports(this.id, this.index)
    .subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
      } else {
        this.totalReportSize = r.data.totalRows;
        this.reports = r.data.list;
      }
    });
  }

  pageChange(pager: PageEvent) {
    this.index = pager.pageIndex + 1;
    this.getReports();
  }
}
