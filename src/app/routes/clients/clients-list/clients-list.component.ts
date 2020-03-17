import { Component, OnInit } from '@angular/core';
import { ClientsService, ClientItem } from '../../../services/clients/clients.service';
import { PageEvent, MatSlideToggleChange } from '@angular/material';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  size = 20;
  totalSize = 100;

  dataSource: ClientItem[] = [
    //  { id: 1, userName: 'myfor', email: 'mfory@qq.com', createDate: '2020-20-20', state: 1 }
  ];
  columnsToDisplay = ['userName', 'email', 'createDate', 'action'];

  constructor(
    private client: ClientsService,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.getClientsList(1);
  }

  pageChange(page: PageEvent) {
    this.getClientsList(page.pageIndex);
  }

  private getClientsList(index: number) {
    this.client.getClients(index).subscribe(result => {
      if (result.isFault) {
        this.common.snackOpen(result.message, 2000);
        return;
      }
      this.dataSource = result.data.list;
    });
  }

  enabledOrDisabled(value: MatSlideToggleChange) {
    if (value.checked) {
      this.client.enabledClient(parseInt(value.source.id, null));
    } else {
      this.client.disabledClient(parseInt(value.source.id, null));
    }
  }
}
