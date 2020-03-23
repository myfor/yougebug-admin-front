import { Component, OnInit, Input } from '@angular/core';
import { AnswersService, AnswerItem } from '../../../services/answers.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-answers-item',
  templateUrl: './answers-item.component.html',
  styleUrls: ['./answers-item.component.css']
})
export class AnswersItemComponent implements OnInit {

  @Input() answer: AnswerItem;

  constructor(
    private answerService: AnswersService,
    private common: CommonService
  ) { }

  ngOnInit() {
  }

  //  启用
  enabled() {
    this.answerService.enabled(this.answer.id)
    .subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
        return;
      } else {
        this.answer.state.key = 1,
        this.answer.state.value = '启用';
      }
    });
  }

  //  禁用
  disabled() {
    this.answerService.disabled(this.answer.id)
    .subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
        return;
      } else {
        this.answer.state.key = 0,
        this.answer.state.value = '禁用';
      }
    });
  }
}
