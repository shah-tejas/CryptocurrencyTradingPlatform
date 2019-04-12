import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { AppState } from '../store/state/app.states';
import { Store } from '@ngrx/store';
import { RegisterUserAction } from '../store/actions/user.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup:FormGroup;
  user:User = new User();
  confirmpassword:String;
  constructor(private _formBuilder: FormBuilder,private store : Store<AppState> ) { 
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      emailId: ['',Validators.required],
      Phno: ['', Validators.required],
      password:['', Validators.required],
      confirmpassword:['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      address1: ['', Validators.required],
      address2: [''],
      city: ['',Validators.required],
      country: ['', Validators.required],
      zipcode: ['',Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      cardno: ['', Validators.required],
      cvv: ['', Validators.required],
      expire: ['', Validators.required],
      name: ['', Validators.required],
      zipcode: ['', Validators.required],
    });
  }

  onSubmit(){
    console.log(this.user);
    console.log(this.confirmpassword);
    console.log(this.user.login.password);
    this.user.login.username=this.user.emailId;
    if(this.user.login.password===(this.confirmpassword)){
      this.store.dispatch(new RegisterUserAction(this.user));
    }else{
      alert("Please enter same password");
    }
  }
}
