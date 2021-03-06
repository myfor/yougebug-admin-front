import { Component, OnInit } from '@angular/core';
import { QuestionsService, QuestionItem } from '../../../services/questions/questions.service';
import { PageEvent, MatSlideToggleChange } from '@angular/material';
import { CommonService, State } from 'app/services/common.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  searchTitle = '';
  selectedState = '';

  index = 1;
  size = 0;
  totalSize = 0;
  dataSource: QuestionItem[] = [
    //  { id: 0, title: 'title', description: 'description', state: 0, createDate: '2020[20[20' }
  ];

  columnsToDisplay = ['title', 'description', 'answersCount', 'createDate', 'state', 'action' ];

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
    this.question.getQuestions(this.index, this.searchTitle, this.selectedState).subscribe(result => {
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

    const currentId = parseInt(value.source.id, null);
    let currentItem: QuestionItem;
    this.dataSource.map((v, i) => {
      if (v.id === currentId) {
        currentItem = v;
        return;
      }
    });

    if (value.checked) {
      this.question.enabledQuestion(currentId)
      .subscribe(r => {
        if (r.isFault) {
          this.common.snackOpen(r.message, 3000);
          value.checked = false;
          return;
        }
        currentItem.state.key = State.enabled.key;
        currentItem.state.value = State.enabled.value;
      });
    } else {
      this.question.disabledQuestion(currentId, '于列表禁用')
      .subscribe(r => {
        if (r.isFault) {
          this.common.snackOpen(r.message, 3000);
          value.checked = true;
          return;
        }
        currentItem.state.key = State.disabled.key;
        currentItem.state.value = State.disabled.value;
      });
    }
  }

  search(title: string, selectedState: string) {
    title = title.trim();
    this.searchTitle = title;
    this.selectedState = selectedState;
    this.getQuestionsList();
  }

  //  软删除
  detele(id: number) {
    this.question.deleteQuestion(id).subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
        return;
      }
      this.dataSource.map((v, i) => {
        if (v.id === id) {
          v.state.key = State.remove.key;
          v.state.value = State.remove.value;
          return;
      }
      });
    });
  }
}
