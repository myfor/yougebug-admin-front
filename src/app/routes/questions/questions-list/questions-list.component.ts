import { Component, OnInit } from '@angular/core';
import { QuestionsService, QuestionItem } from '../../../services/questions.service';
import { PageEvent, MatSlideToggleChange } from '@angular/material';
import { CommonService } from 'app/services/common.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  index = 1;
  searchTitle = '';
  size = 0;
  totalSize = 0;
  dataSource: QuestionItem[] = [
    //  { id: 0, title: 'title', description: 'description', state: 0, createDate: '2020[20[20' }
  ];

  columnsToDisplay = ['title', 'description', 'createDate', 'action' ];

  constructor(
    private question: QuestionsService,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.getQuestionsList();
  }

  pageChange(page: PageEvent) {
    this.index = page.pageIndex + 1;
    this.getQuestionsList();
  }

  private getQuestionsList() {
    this.question.getQuestions(this.index, this.searchTitle).subscribe(result => {
      if (result.isFault) {
        this.common.snackOpen(result.message, 2000);
        return;
      }
      this.dataSource = result.data.list;
      this.size = result.data.size;
      this.totalSize = result.data.totalRows;
    });
  }

  enabledOrDisabled(value: MatSlideToggleChange) {
    value.source.disabled = true;
    const disabledInterval$ = interval(1000).pipe(take(1));
    disabledInterval$.subscribe(() => value.source.disabled = false);

    if (value.checked) {
      this.question.enabledQuestion(parseInt(value.source.id, null))
      .subscribe(r => {
        if (r.isFault) {
          this.common.snackOpen(r.message, 3000);
          value.checked = false;
          return;
        }
      });
    } else {
      this.question.disabledQuestion(parseInt(value.source.id, null))
      .subscribe(r => {
        if (r.isFault) {
          this.common.snackOpen(r.message, 3000);
          value.checked = true;
          return;
        }
      });
    }
  }

  search(title: string) {
    title = title.trim();
    this.searchTitle = title;
    this.getQuestionsList();
  }
}
