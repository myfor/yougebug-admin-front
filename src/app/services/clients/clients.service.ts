import { Injectable } from '@angular/core';
import { ServicesBase, Paginator, Result } from '../common';

//  客户列表单项
export class ClientItem {
  id: number;
  userName: string;
  email: string;
  createDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private base: ServicesBase
  ) { }
}
