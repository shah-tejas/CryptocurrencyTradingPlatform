import { Component, OnInit } from '@angular/core';
import { RateListService } from '../services/rate-list.service';
import { Rate } from '../models/rate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rate-chart',
  templateUrl: './rate-chart.component.html',
  styleUrls: ['./rate-chart.component.scss']
})
export class RateChartComponent implements OnInit {

    days: any[] = [
        { Day: '2019-04-18' },
        { Day: '2019-04-19' },
        { Day: '2019-05-20' },
        { Day: '2019-06-21' },
        { Day: '2019-07-22' },
        { Day: '2019-08-23' },
        { Day: '2019-08-24' }
    ];
    BTC: Array<Rate>;
    ETH: Array<Rate>;
    LTC: Array<Rate>;
    EOS: Array<Rate>;

  private BTCobserver: any = {
    next: data => {
      this.BTC = data;
      console.log(this.BTC);
      console.log(data);
    },
    error: err => console.log(err)
  };

  private ETHobserver: any = {
    next: data => {
      this.ETH = data;
      console.log(this.ETH);
      console.log(data);
    },
    error: err => console.log(err)
  };

  private LTCobserver: any = {
    next: data => {
      this.LTC = data;
      console.log(this.LTC);
      console.log(data);
    },
    error: err => console.log(err)
  };

  private EOSobserver: any = {
    next: data => {
      this.EOS = data;
      console.log(this.EOS);
      console.log(data);
    },
    error: err => console.log(err)
  };

  constructor(private rateService: RateListService, private router: Router) {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    }else{
      rateService.get("BTC").subscribe(this.BTCobserver);
      rateService.get("ETH").subscribe(this.ETHobserver);
      rateService.get("LTC").subscribe(this.LTCobserver);
      rateService.get("EOS").subscribe(this.EOSobserver);
    }
  }

  ngOnInit() {
  }

  padding: any = { left: 5, top: 5, right: 40, bottom: 5 };
  titlePadding: any = { left: 90, top: 0, right: 0, bottom: 10 };
  getWidth() : any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }
    return 850;
  }

  xAxis: any = {
      dataField: 'Day',
      gridLines: { visible: true }
  };
  valueAxis: any = {
      visible: true,
      title: { text: 'USD' }
  };
  seriesGroups: any[] = [
    {
      type: 'stackedline',
      source: this.BTC,
      series: [
          { dataField: 'usdvalue', displayText: 'BTC' }
      ]
    },
    {
      type: 'stackedline',
      source: this.ETH,
      series: [
          { dataField: 'usdvalue', displayText: 'ETH' }
      ]
    },
    {
      type: 'stackedline',
      source: this.LTC,
      series: [
          { dataField: 'usdvalue', displayText: 'LTC' }
      ]
    },
    {
      type: 'stackedline',
      source: this.EOS,
      series: [
          { dataField: 'usdvalue', displayText: 'EOS' }
      ]
    }
  ];

 //  days: any[] = [
 //       { Day: 'Monday' },
 //       { Day: 'Tuesday' },
 //       { Day: 'Wednesday' },
 //       { Day: 'Thursday' },
 //       { Day: 'Friday' },
 //       { Day: 'Saturday' },
 //       { Day: 'Sunday' }
 //   ];
 //   Keith: any[] = [
 //       { Minutes: 30 },
 //       { Minutes: 25 },
 //       { Minutes: 30 },
 //       { Minutes: 35 },
 //       { Minutes: 20 },
 //       { Minutes: 30 },
 //       { Minutes: 60 }
 //   ];
 //   Erica: any[] = [
 //       { Minutes: 15 },
 //       { Minutes: 25 },
 //       { Minutes: 20 },
 //       { Minutes: 25 },
 //       { Minutes: 20 },
 //       { Minutes: 20 },
 //       { Minutes: 45 }
 //   ];
 //   George: any[] = [
 //       { Minutes: 25 },
 //       { Minutes: 30 },
 //       { Minutes: 25 },
 //       { Minutes: 45 },
 //       { Minutes: 25 },
 //       { Minutes: 30 },
 //       { Minutes: 90 }
 //   ];
 //   padding: any = { left: 5, top: 5, right: 40, bottom: 5 };
 //   titlePadding: any = { left: 90, top: 0, right: 0, bottom: 10 };
 // getWidth() : any {
 //   if (document.body.offsetWidth < 850) {
 //     return '90%';
 //   }
 //
 //   return 850;
 // }
 //
 //   xAxis: any =
 //   {
 //       dataField: 'Day',
 //       gridLines: { visible: true }
 //   };
 //   valueAxis: any =
 //   {
 //       visible: true,
 //       title: { text: 'Time in minutes' }
 //   };
 //   seriesGroups: any[] =
 //   [
 //       {
 //           type: 'stackedline',
 //           source: this.Keith,
 //           series: [
 //               { dataField: 'Minutes', displayText: 'Keith' }
 //           ]
 //       },
 //       {
 //           type: 'stackedline',
 //           source: this.Erica,
 //           series: [
 //               { dataField: 'Minutes', displayText: 'Erica' }
 //           ]
 //       },
 //       {
 //           type: 'stackedline',
 //           source: this.George,
 //           series: [
 //               { dataField: 'Minutes', displayText: 'George' }
 //           ]
 //       }
 //   ];

}
