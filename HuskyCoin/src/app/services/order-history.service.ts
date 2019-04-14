import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  constructor(
    private url: String = "http://localhost:3000/orderhistory"
  ) { }
}
