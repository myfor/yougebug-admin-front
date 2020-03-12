import { Component, OnInit } from '@angular/core';
import { ClientsService, ClientItem } from '../../../services/clients/clients.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  index = 0;
  size = 20;
  totalSize = 100;

  dataSource: ClientItem[] = [
    { id: 1, userName: 'myfor', email: 'mfory@qq.com', createDate: '2020-20-20' }
  ];
  columnsToDisplay = ['userName', 'email', 'createDate', 'action'];

  constructor() { }

  ngOnInit() {
  }

  pageChange(page: PageEvent) {
    this.index = page.pageIndex;
  }
}
