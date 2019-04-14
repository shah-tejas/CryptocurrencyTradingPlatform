import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sex: string;
  title = 'HuskyCoin';
  isChecked: boolean = true;
  foods: string[] = ["Pizza","Pasta"];
  @Input() food: String;

  onChange=function(){
    this.title = (this.title=="Fuck Me")? "HuskyCoin": "Fuck Me";
  }

  sexChange=function($event){
    this.sex = $event.target.textContent;
  }
}
