import { Component, OnInit, Input } from '@angular/core';
import { AnswersService, AnswerItem } from '../../../services/answers.service';
import { CommonService, State } from '../../../services/common.service';

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
        this.answer.state.key = State.enabled.key,
        this.answer.state.value = State.enabled.value;
      }
    });
  }

  //  禁用
  disabled(source: string) {
    if (!source) {
      this.common.snackOpen('请填写禁用原因', 3000);
      return;
    }
    this.answerService.disabled(this.answer.id, source)
    .subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message, 3000);
        return;
      } else {
        this.answer.state.key = State.disabled.key,
        this.answer.state.value = State.disabled.value;
      }
    });
  }
}
