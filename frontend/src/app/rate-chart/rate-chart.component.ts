import { Component, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { RateListService } from '../services/rate-list.service';
import { Rate } from '../models/rate';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-rate-chart',
  templateUrl: './rate-chart.component.html',
  styleUrls: ['./rate-chart.component.scss']
})
export class RateChartComponent implements OnInit {
  private chart = [];
  private days: any[];
  // private BTC: any[];
  private ETH: any[];
  private LTC: any[];
  private EOS: any[];
  private display: boolean = true;

  constructor(private rateService: RateListService, private router: Router) {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(){
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    }else{
      // this.rateService.get("BTC").subscribe(this.BTCobserver);
      this.rateService.get("ETH").subscribe(this.ETHobserver);
      this.rateService.get("LTC").subscribe(this.LTCobserver);
      this.rateService.get("EOS").subscribe(this.EOSobserver);
    }
  }

  // private BTCobserver: any = {
  //   next: data => {
  //     this.BTC = data.map(res => res.usdvalue);
  //   }, error: err => console.log(err)
  // };

  private ETHobserver: any = {
    next: data => {
      this.ETH = data.map(res => res.usdvalue);
    }, error: err => console.log(err)
  };

  private LTCobserver: any = {
    next: data => {
      this.LTC = data.map(res => res.usdvalue);
    }, error: err => console.log(err)
  };

  private EOSobserver: any = {
    next: data => {
      this.EOS = data.map(res => res.usdvalue);
      this.days = data.map(res => res.insert_date.toString().split('T')[0]);
      console.log(this.EOS);
      console.log(this.days);
      this.helper();
    },
    error: err => console.log(err)
  };

  helper = function() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.days,
        datasets: [
          {
            data: this.BTC,
            borderColor: "red",
            fill: false
          },
          {
            data: this.ETH,
            borderColor: "pink",
            fill: false
          },
          {
            data: this.LTC,
            borderColor: "green",
            fill: false
          },
          {
            data: this.EOS,
            borderColor: "red",
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    })
  }
}
