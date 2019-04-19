import { Component, OnInit, OnChanges } from '@angular/core';
import { RateListService } from '../services/rate-list.service';
import { Rate } from '../models/rate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rate-chart',
  templateUrl: './rate-chart.component.html',
  styleUrls: ['./rate-chart.component.scss']
})
export class RateChartComponent implements OnInit {
    private BTC: any[];
    private ETH: any[];
    private LTC: any[];
    private EOS: any[];
    private display: boolean = true;

  private BTCobserver: any = {
    next: data => {
      this.BTC = data;
      console.log(this.BTC);
    },
    error: err => console.log(err)
  };

  private ETHobserver: any = {
    next: data => {
      this.ETH = data;
      console.log(this.ETH);
    },
    error: err => console.log(err)
  };

  private LTCobserver: any = {
    next: data => {
      this.LTC = data;
      console.log(this.LTC);
    },
    error: err => console.log(err)
  };

  private EOSobserver: any = {
    next: data => {
      // this.EOS = data;
      this.iterate(data,this.EOS);
      console.log("-------------");
      this.display = true;
      console.log(this.display);
    },
    error: err => console.log(err)
  };

  iterate = function(data: Rate[], container: any[]) {
    this.container = new Array();
    for (var temp of data) {
        this.container.push({usdvalue: temp.usdvalue});
        console.log(temp.usdvalue);
    }

    console.log(this.container);
    console.log(this.Keith);
  }
  //
  constructor(private rateService: RateListService, private router: Router) {

  }
  //
  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    }else{
      this.rateService.get("BTC").subscribe(this.BTCobserver);
      this.rateService.get("ETH").subscribe(this.ETHobserver);
      this.rateService.get("LTC").subscribe(this.LTCobserver);
      // this.rateService.get("EOS").subscribe(this.EOSobserver);
    }
  }

  days: any[] = [
          { Day: '2019-04-18' },
          { Day: '2019-04-19' },
          { Day: '2019-05-20' },
          { Day: '2019-06-21' },
          { Day: '2019-07-22' },
          { Day: '2019-08-23' },
          { Day: '2019-08-24' }
   ];
   Keith: any[] = [
       { Minutes: 30 },
       { Minutes: 50 },
       { Minutes: 30 },
       { Minutes: 35 },
       { Minutes: 20 },
       { Minutes: 30 },
       { Minutes: 60 }
   ];
   Erica: any[] = [
       { Minutes: 15 },
       { Minutes: 25 },
       { Minutes: 20 },
       { Minutes: 25 },
       { Minutes: 20 },
       { Minutes: 20 },
       { Minutes: 45 }
   ];
   George: any[] = [
       { Minutes: 25 },
       { Minutes: 30 },
       { Minutes: 25 },
       { Minutes: 45 },
       { Minutes: 25 },
       { Minutes: 30 },
       { Minutes: 90 }
   ];
   // EOS: any[] = [
   //     { usdvalue: 212 },
   //     { usdvalue: 100 },
   //     { usdvalue: 149 },
   //     { usdvalue: 190 },
   //     { usdvalue: 167 },
   //     { usdvalue: 132 },
   //     { usdvalue: 90 }
   // ];
   padding: any = { left: 5, top: 5, right: 40, bottom: 5 };
   titlePadding: any = { left: 90, top: 0, right: 0, bottom: 10 };
 getWidth() : any {
   if (document.body.offsetWidth < 850) {
     return '90%';
   }

   return 850;
 }

   xAxis: any =
   {
       dataField: 'Day',
       gridLines: { visible: true }
   };
   valueAxis: any =
   {
       visible: true,
       title: { text: 'USD' }
   };
   seriesGroups: any[] =
   [
       {
           type: 'stackedline',
           source: this.Keith,
           series: [
               { dataField: 'Minutes', displayText: 'BTC' }
           ]
       },
       {
           type: 'stackedline',
           source: this.Erica,
           series: [
               { dataField: 'Minutes', displayText: 'ETH' }
           ]
       },
       {
           type: 'stackedline',
           source: this.George,
           series: [
               { dataField: 'Minutes', displayText: 'LTC' }
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

}
