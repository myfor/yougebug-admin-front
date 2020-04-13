import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';
import { ReportQuestionsService, ReportQuestionDetail, Report } from '../../../services/questions/report-questions.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-reports-detail',
  templateUrl: './reports-detail.component.html',
  styleUrls: ['./reports-detail.component.css']
})
export class ReportsDetailComponent implements OnInit {

  id = 0;
  index = 1;
  detail: ReportQuestionDetail = this.reportQuestion.emptyReportQuestionDetail;

  totalReportSize = 0;
  reports: Report[] = [];

  constructor(
    private common: CommonService,
    private reportQuestion: ReportQuestionsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getDetail();
    this.getReports();
  }

  private getDetail() {
    this.reportQuestion.getReportQuestionDetail(this.id).subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
      } else {
        this.detail = r.data;
      }
    });
  }

  private getReports() {
    this.reportQuestion.getReports(this.id, this.index)
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

  //  删除这个提问
  delete(confirmText: string) {
    if (confirmText !== '确认删除') {
      this.common.snackOpen('请输入“确认删除”来删除');
      return;
    }

  }

  //  退回提问
  back(reason: string) {
    reason = reason.trim();
    if (!reason) {
      this.common.snackOpen('请输入退回理由', 3000);
    }
  }

  //  忽略这次举报
  ignore() {

  }
}
