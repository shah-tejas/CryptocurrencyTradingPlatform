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
  // Chart Object which contains array of nodes.
  private chart = [];
  // array of days corresponding to the array of rates
  private days: any[];
  // array of currency rate
  private data: any[];
  // flags to indicate which chart to display, load the page with BTC chart
  private displayBTC: boolean = true;
  private displayETH: boolean = false;
  private displayLTC: boolean = false;
  private displayEOS: boolean = false;
  // id here represent which Coins rate chart to be displayed
  private id: String = 'BitCoin';
  // color sets the color of the strock
  private color: String = "red";

  constructor(private rateService: RateListService, private router: Router) {
    // redirect to login page if not logged in
    // if (!localStorage.getItem('token')) {
    //   this.router.navigateByUrl('/login');
    // }
  }

  ngOnInit(){
    // redirect to login page if not logged in
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    }else{
      // ajax call to get the rate list of BTC coin
      this.rateService.get(this.id).subscribe(this.DATAobserver);
    }
  }

  private DATAobserver: any = {
    next: data => {
      // convert the array of rate Object to corresponding array of usdvalue
      this.data = data.map(res => res.usdvalue);
      // convert the array of rate Object to its corresponding date at which the rate was so
      this.days = data.map(res => res.insert_date.toString().split('T')[0]);
      this.helper();
    },
    error: err => console.log(err)
  };

  // constructors the Chart Object to be dislayed in template
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

  // event listener to listen in on which tab was pressed and render that chart
  getChart($event): void{
    // get the index of the tab clicked
    let tabIndex = $event.index;
    console.log(tabIndex);
    this.helper2(tabIndex);
    // ajax call to get the list of rates based on the which tab was clicked
    this.rateService.get(this.id).subscribe(this.DATAobserver);
  }

  // helper function to decide which chart to be created based on the clients input on the tab selected
  helper2(coin): void{
    this.displayBTC = false;
    this.displayETH = false;
    this.displayLTC = false;
    this.displayEOS = false;
    // show the rate list of the BTC Coin
    if(coin == 0) {
      this.color="red";
      this.id = "BitCoin";
      this.displayBTC = true;
    }
    // show the rate list of the ETH Coin
    else if(coin == 1) {
      this.color="pink";
      this.id = "ETH";
      this.displayETH = true;
    }
    // show the rate list of the LTC Coin
    else if(coin == 2) {
      this.color="green";
      this.id = "LTC";
      this.displayLTC = true;
    }
    // show the rate list of the EOS Coin
    else {
      this.color="blue";
      this.id = "EOS";
      this.displayEOS = true;
    }
  }
}
