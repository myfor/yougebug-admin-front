import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsDetailComponent } from './clients-detail/clients-detail.component';


@NgModule({
  declarations: [ClientsListComponent, ClientsDetailComponent],
  imports: [
    SharedModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
