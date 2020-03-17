import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back',
  template: `
    <button mat-raised-button color="primary" (click)="back()">后退</button>
  `,
  styleUrls: ['./back.component.css']
})
export class BackComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  back() {
    history.back();
  }
}
