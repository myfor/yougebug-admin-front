import { Component, OnInit } from '@angular/core';
import { QuestionsService, ReportQuestionItem } from '../../../services/questions.service';
import { CommonService } from '../../../services/common.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  index = 1;
  totalSize = 0;
  searchTitle = '';
  dataSource: ReportQuestionItem[] = [];
  columnsToDisplay = ['title', 'reportCount', 'state', 'action' ];

  constructor(
    private question: QuestionsService,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.getList();
  }

  private getList() {
    this.question.getReportQuestion(this.index, this.searchTitle).subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
      } else {
        this.dataSource = r.data.list;
        this.totalSize = r.data.totalRows;
      }
    });
  }

  search(searchTitle: string) {
    this.searchTitle = searchTitle;
    this.getList();
  }

  pageChange(pager: PageEvent) {
    this.index = pager.pageIndex;
    this.getList();
  }
}
