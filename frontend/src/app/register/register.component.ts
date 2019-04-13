import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { AppState, selectAuthState } from '../store/state/app.states';
import { Store } from '@ngrx/store';
import { Register } from '../store/actions/user.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup:FormGroup;
  user:User = new User();
  confirmpassword:String;

  // //error msgs
  // getState: Observable<any>;
  // errorMessage: string | null;
  constructor(private _formBuilder: FormBuilder,private store : Store<AppState> ) { 
    // this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      emailId: ['',Validators.required, Validators.pattern('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')],
      Phno: ['', Validators.required, Validators.length],
      password:['', Validators.required, Validators.minLength(6)],
      confirmpassword:['', Validators.required, Validators.minLength(6)]
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
    this.user.login.username=this.user.emailId;
    if(this.user.login.password===(this.confirmpassword)){
      this.store.dispatch(new Register(this.user));
    }else{
      alert("Please enter same password");
    }
  }
}
