import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../models/user';
import { AppState, selectAuthState } from '../store/state/app.states';
import { Store } from '@ngrx/store';
import { Register } from '../store/actions/user.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  /**
 * @var isLinear boolean value. checks if the form should be allowed to the  secon part or not
 * @var generalDetailsFormGroup FormGroup
 * @var addressDetailsFormGroup FormGroup
 * @var paymentDetailsFormGroup FormGroup
 * @var loginDetailsFormGroup FormGroup
 */
  isLinear = true;
  generalDetailsFormGroup: FormGroup;
  addressDetailsFormGroup: FormGroup;
  paymentDetailsFormGroup: FormGroup;
  loginDetailsFormGroup: FormGroup;
  user: User = new User();
  confirmpassword: String;
  errorMessage = '';
  getState: Observable<any>;

  constructor(private _formBuilder: FormBuilder, private store: Store<AppState>, private router: Router,
    public snackbar: MatSnackBar) {
      this.getState = this.store.select(selectAuthState);
  }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('confirmpassword').value;
    return condition ? {passwordsDoNotMatch: true} : null;
  }

  ngOnInit() {

    /**
     * @desc the if loop checks if the user is logged  in or not ,
     * if it is then it does not allow the user to got the register page, it routes you  back to the home page.
     */
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/home');
    }

     /**
     * @desc subscribed the getstate observable to print the error message if there is invalid credentials
     */
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });

    /**
     * @desc  ._formBuilder.group is used to add validations for each field on the registration form
     */
    this.generalDetailsFormGroup = this._formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*')]],
      Phno: ['', [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')]]
    });
    this.addressDetailsFormGroup = this._formBuilder.group({
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern('[0-9]{5}')]]
    });
    this.paymentDetailsFormGroup = this._formBuilder.group({
      cardno: ['', [Validators.required, Validators.pattern('([0-9]{4}){4}')]],
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      expire: ['', [Validators.required, Validators.pattern('(1[0-2]|0[1-9]|[0-9])\/[1-9][0-9]')]],
      name: ['', Validators.required],
      zipcode: ['', [Validators.required,Validators.pattern('[0-9]{5}')]]
    });
    this.loginDetailsFormGroup = this._formBuilder.group({
      emailId: [{ Value: '', disabled: true }],
      password: ['', [Validators.required,Validators.pattern('[^\s]{6,13}')]],
      confirmpassword: ['', Validators.required]
    });
  }

  /***
   * @desc this method is called on the submit button .
   * It checks if the username and email id is same and also  checks if the password and confirm password is used.
   */
  onSubmit() {
    this.user.login.username = this.user.emailId;
    if (this.user.login.password === (this.confirmpassword)) {
      this.store.dispatch(new Register(this.user));
      
    } else {
      this.snackbar.open("Please enter same password", "OK",{
        duration: 5000,
      });
    }
  }

}
