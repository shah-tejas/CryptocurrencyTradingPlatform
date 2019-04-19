import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/state/app.states';
import { LogOut, AccountSettings } from '../store/actions/user.actions';
import { Router } from '@angular/router';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @Output() logoutchild: EventEmitter<String> = new EventEmitter<String>();
  @Output() shownavbar: EventEmitter<String> = new EventEmitter<String>();
  constructor(private store: Store<AppState>, private router: Router)
  {

  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    }
  }
  logOut(): void {
    console.log("------hhiii--");
    console.log( JSON.parse((localStorage.getItem("user"))));

    this.store.dispatch(new LogOut);
    this.logoutchild.emit("loggedout");
  }

  settings(): void {
  console.log( JSON.parse((localStorage.getItem("user"))));
  this.store.dispatch(new AccountSettings() );
  }

  toggle=function(){
    console.log(this.display);
    this.shownavbar.emit("shwing nav bar");
    this.isToggled = !this.isToggled;
  }

}
