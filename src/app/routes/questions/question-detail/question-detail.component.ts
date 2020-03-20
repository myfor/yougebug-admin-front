import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { QuestionsService, QuestionDetail } from '../../../services/questions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  id: number;
  detail: QuestionDetail = {
    title: 'title',
    description: `
    descpiptionaaaaaa
    descpiptionaaaaaa
    descpiptionaaaaaa
    descpiptionaaaaaa
    descpiptionaaaaaa
    descpiptionaaaaaa
    descpiptionaaaaaa
    descpiptionaaaaaa
    descpiptionaaaaaa
    `,
    state: 1,
    createDate: '2020-02-02',
    tags: ['a', 'b'],
    votes: 120,
    views: 100,
    askerId: 1,
    askerName: 'username',
    askerThumbnail: 'assets/images/avatar.png',
    answers: []
  };

  constructor(
    private question: QuestionsService,
    private route: ActivatedRoute,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), null);
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
}
