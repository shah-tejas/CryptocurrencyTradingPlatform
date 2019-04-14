import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderTypeHistoryComponent } from './order-history/order-type-history/order-type-history.component';

const routes: Routes = [
  // {path: '', component: HomePageComponent},
  {path: 'orderHistory/:type', component: OrderTypeHistoryComponent},
  {path: 'orderHistory', component: OrderHistoryComponent}
  // {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
