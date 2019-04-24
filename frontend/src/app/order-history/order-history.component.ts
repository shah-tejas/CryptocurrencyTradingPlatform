import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { OrderHistoryService } from '../services/order-history.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';


import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  /**
   *  @var holds pending or completed or canceled orders
   */
  orders: Array<Order>;

  constructor(private orderhistory: OrderHistoryService, private router: Router) {
  }

  /**
  * @param {function(): void} param - this is function is called when is loaded in component life cycle
  */
  ngOnInit() {
    // if user tries to directly login to this page without loging in then he is redirecteed to the login page
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    }else{
      // get the logged in users userId from the local Storage
      this.orderhistory.setUserID(JSON.parse(localStorage.getItem('user'))._id);
      this.reloadPendingOrders();
    }
  }

  /**
  * @param {function(): void} param - this is function is used to fetch data of the logged in users pending orders
  */
  reloadPendingOrders(): void {
    this.orderhistory.get("pending")
    .subscribe({
      next: response => {
        this.orders = response["data"];
      },
      error: err => console.log(err)
    });
  }

  /**
  * @param {function(): void} param - this is function is used to fetch data of the logged in users completed orders
  */
  reloadCompletedOrders(): void {
    this.orderhistory.get("completed")
    .subscribe({
      next: response => {
        this.orders = response["data"];
      },
      error: err => console.log(err)
    });
  }

  /**
  * @param {function(): void} param - this is function is used to fetch data of the logged in users canceled orders
  */
  reloadCanceledOrders(): void {
    this.orderhistory.get("canceled")
    .subscribe({
      next: response => {
        this.orders = response["data"];
      },
      error: err => console.log(err)
    });
  }

  /**
  * @param {function(any): void} param - this is function is used to respond to which tab was clicked by the user and render that table
  */
  displayTable($event){
    let tabIndex = $event.index;
    // if the user clicks on the pending orders tab then reload the list of pernding orders
    if(tabIndex == 0) this.reloadPendingOrders();
    // if the user clicks on the pending orders tab then reload the list of completed orders
    else if(tabIndex == 1) this.reloadCompletedOrders();
    // if the user clicks on the pending orders tab then reload the list of canceled orders
    else this.reloadCanceledOrders();
  }


  downloadCancelledOrders(){
    const data = document.getElementById('cancelledOrderData');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 10;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('CancelledOrders.pdf'); // Generated PDF
    });
  }

  downloadCompletedOrders(){
    const data = document.getElementById('completedOrderData');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 10;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('CompletedOrders.pdf'); // Generated PDF
    });
  }

  downloadPendingOrders(){
    const data = document.getElementById('pendingOrderData');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 10;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('PendingOrders.pdf'); // Generated PDF
    });
  }

}
