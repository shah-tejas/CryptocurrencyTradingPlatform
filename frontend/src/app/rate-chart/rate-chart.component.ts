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
  private data: any[];
  private displayBTC: boolean = true;
  private displayETH: boolean = false;
  private displayLTC: boolean = false;
  private displayEOS: boolean = false;
  private id: String = 'BTC';
  private color: String = "red";

  constructor(private rateService: RateListService, private router: Router) {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(){
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    }else{
      this.rateService.get("BTC").subscribe(this.DATAobserver);
    }
  }

  private DATAobserver: any = {
    next: data => {
      this.data = data.map(res => res.usdvalue);
      this.days = data.map(res => res.insert_date.toString().split('T')[0]);
      this.helper();
    },
    error: err => console.log(err)
  };

  helper = function() {
    this.chart = new Chart(this.id, {
      type: 'line',
      data: {
        labels: this.days,
        datasets: [{
          data: this.data,
          borderColor: this.color,
          fill: false
        }]
      },
      options: {
        legend: { display: false },
        title: {
            display: true,
            text: "Currency Rate Fluctuation",
            fontSize: 24
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Dates',
              fontSize: 20
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'USD',
              fontSize: 20
            }
          }]
        }
      }
    })
  }

  getChart($event): void{
    let tabIndex = $event.index;
    console.log(tabIndex);
    this.helper2(tabIndex);
    this.rateService.get(this.id).subscribe(this.DATAobserver);
  }

  helper2(coin): void{
    this.displayBTC = false;
    this.displayETH = false;
    this.displayLTC = false;
    this.displayEOS = false;
    if(coin == 0) {
      this.color="red";
      this.id = "BTC";
      this.displayBTC = true;
    }else if(coin == 1) {
      this.color="yellow";
      this.id = "ETH";
      this.displayETH = true;
    }else if(coin == 2) {
      this.color="green";
      this.id = "LTC";
      this.displayLTC = true;
    }else {
      this.color="blue";
      this.id = "EOS";
      this.displayEOS = true;
    }
    console.log(this.displayBTC);
    console.log(this.displayETH);
    console.log(this.displayLTC);
    console.log(this.displayEOS);
  }
}
