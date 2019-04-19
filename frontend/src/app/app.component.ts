import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Husky Coin';
  login = true;

  private loggedin: boolean = false;

  constructor(private router: Router){
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.loggedin = true;
      this.router.navigateByUrl('/home');
    }else{
      this.loggedin = false;
      this.router.navigateByUrl('/login');
    }
  }

  authenticate = function() {
    console.log("%%%%%%%%%%%%");
    if(localStorage.getItem('token')){
      // this.loggedin = true;
      this.router.navigateByUrl('/home');
    }else{
      // this.loggedin = false;
      this.router.navigateByUrl('/login');
    }
    this.loggedin = !this.loggedin;
  }

  logout = function() {
    this.authenticate();
  }
}
