import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../models/user';
import { AppState, selectAuthState } from '../store/state/app.states';
import { Store } from '@ngrx/store';
import { Register } from '../store/actions/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  isLinear = true;
  generalDetailsFormGroup: FormGroup;
  addressDetailsFormGroup: FormGroup;
  paymentDetailsFormGroup:FormGroup;
  loginDetailsFormGroup: FormGroup;
  user:User = new User();
  confirmpassword:String;

  // //error msgs
  // getState: Observable<any>;
  // errorMessage: string | null;
  constructor(private _formBuilder: FormBuilder,private store : Store<AppState>, private router:Router ) { 
    // this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.router.navigateByUrl('/home');
    }

    this.generalDetailsFormGroup = this._formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      emailId: ['',Validators.pattern('[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*')],
      Phno: ['', Validators.pattern('[1-9]{1}[0-9]{9}')],
    });
    this.addressDetailsFormGroup = this._formBuilder.group({
      address1: ['', Validators.required],
      address2: [''],
      city: ['',Validators.required],
      country: ['', Validators.required],
      zipcode: ['',Validators.pattern('[0-9]{5}')]
    });
    this.paymentDetailsFormGroup = this._formBuilder.group({
      cardno: ['', Validators.pattern('([0-9]{4}){4}')],
      cvv: ['', Validators.pattern('[0-9]{3}')],
      expire: ['', Validators.required],
      name: ['', Validators.required],
      zipcode: ['', Validators.required]
    });
    this.loginDetailsFormGroup = this._formBuilder.group({
      emailId: [{Value:'',disabled:true}],
      password: ['',Validators.required],
      confirmpassword: ['',Validators.required]
    });
  }

  onSubmit(){
    this.user.login.username=this.user.emailId;
    if(this.user.login.password===(this.confirmpassword)){
      this.store.dispatch(new Register(this.user));
    }else{
      alert("Please enter same password");
    }
  }
}
