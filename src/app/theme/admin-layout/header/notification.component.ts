import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-notification',
  template: `
    <button mat-icon-button class="matero-toolbar-button" [matMenuTriggerFor]="menu">
      <mat-icon>notifications</mat-icon>
      <span class="badge bg-red-500">{{notifyCount}}</span>
    </button>

    <mat-menu #menu="matMenu">
      <mat-nav-list>
        <mat-list-item *ngFor="let message of messages; let i = index;">
          <a matLine href="javascript:;" matTooltip="点击已读" matTooltipPosition="left" (click)="readed(message.key)">{{ message.value }}</a>
          <button mat-icon-button>
            <mat-icon>info</mat-icon>
          </button>
        </mat-list-item>
      </mat-nav-list>
    </mat-menu>
  `,
})
export class NotificationComponent implements OnInit {
  notifyCount = 0;
  messages: KeyValue<number, string>[] = [
    // {
    //   key: 1,
    //   value: 'Server Error Reports'
    // }
  ];

  ngOnInit() {
    this.notifyCount = this.messages.length;
  }

  //  已读
  readed(index: number) {
    this.notifyCount--;
    this.messages.splice(index - 1, 1);
  }
}
