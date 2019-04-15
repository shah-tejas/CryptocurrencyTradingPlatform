import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  // {path: '', component: HomePageComponent},
  // {path: 'orderHistory/:type', component: OrderTypeHistoryComponent},
  {path: 'orderHistory', component: OrderHistoryComponent}
  // {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
