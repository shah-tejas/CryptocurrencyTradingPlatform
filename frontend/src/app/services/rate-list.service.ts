import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rate } from '../models/rate';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RateListService {
  private url: String = "http://localhost:3000/rateHistory/";

  constructor( private http: HttpClient ) { }

  // to get the history of rates for a particular coin
  public get = function(coin): Observable<Rate[]>{
    return this.http.get(this.url+coin);
  }
}
