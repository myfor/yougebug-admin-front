import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsDetailComponent } from './clients-detail/clients-detail.component';

const clientsRoutes: Routes = [
  { path: '', component: ClientsListComponent },
  { path: ':id', component: ClientsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(clientsRoutes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
