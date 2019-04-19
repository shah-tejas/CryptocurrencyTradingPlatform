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

  public get = function(coin): Observable<Rate[]>{
    return this.http.get(this.url+coin);
  }
}
