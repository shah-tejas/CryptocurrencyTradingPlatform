import { Component, OnInit } from '@angular/core';
import { fadein } from '../animations/Fade';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    fadein
  ]
})
export class CarouselComponent implements OnInit {

  display: string = 'invisible';

  constructor() { }

  ngOnInit() {
  }

  change=function(){
    this.display = (this.display === 'visible') ? 'invisible' : 'visible';
  }
}
