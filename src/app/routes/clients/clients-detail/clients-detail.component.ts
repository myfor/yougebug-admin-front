import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { ClientsService, ClientDetail } from '../../../services/clients/clients.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.css']
})
export class ClientsDetailComponent implements OnInit {

  id = 0;
  detail: ClientDetail = {
    userName: 'userName',
    email: 'email',
    avatar: 'assets/images/avatar.png',
    state: {
      key: 1,
      value: '启用'
    },
    createDate: '2020-20-20'
  };

  constructor(
    private client: ClientsService,
    private route: ActivatedRoute,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), null);
    this.client.getClientDetail(this.id)
    .subscribe(r => {
      if (r.isFault) {
        this.common.snackOpen(r.message);
        history.back();
        return;
      }
      this.detail = r.data;
    });
  }

  enabledOrDisabled(value: MatSlideToggleChange) {
    if (value.checked) {
      this.client.enabledClient(parseInt(value.source.id, null))
      .subscribe(r => {
        if (r.isFault) {
          this.common.snackOpen(r.message, 2000);
          value.checked = true;
          return;
        }
      });
    } else {
      this.client.disabledClient(parseInt(value.source.id, null))
      .subscribe(r => {
        if (r.isFault) {
          this.common.snackOpen(r.message, 2000);
          value.checked = false;
          return;
        }
      });
    }
  }
}
