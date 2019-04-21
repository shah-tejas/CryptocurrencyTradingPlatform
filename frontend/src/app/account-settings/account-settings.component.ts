import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../models/user';
import { AppState, selectAuthState } from '../store/state/app.states';
import { Store } from '@ngrx/store';
import { UpdateUser } from '../store/actions/user.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  /**
 * @var isLinear boolean value. checks if the form should be allowed to the  secon part or not
 * @var generalDetailsFormGroup FormGroup
 * @var addressDetailsFormGroup FormGroup
 * @var paymentDetailsFormGroup FormGroup
 * @var loginDetailsFormGroup FormGroup
 */
  isLinear = false;
  generalDetailsFormGroup: FormGroup;
  addressDetailsFormGroup: FormGroup;
  paymentDetailsFormGroup: FormGroup;
  changePasswordFormGroup: FormGroup;
  user: User;
  confirmpassword: String;
  initialPassword: String = "";
  //changePassword: boolean = false;
  errorMessage = '';

  constructor(private _formBuilder: FormBuilder, private store: Store<AppState>, private router: Router) {
    // this.user = localStorage.getItem("result.user") ;
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
      this.router.navigateByUrl('/accountsettings');
      this.user = JSON.parse((localStorage.getItem("user")))
      this.initialPassword = this.user.login.password;
    } else {
      this.router.navigateByUrl('/login');
    }
    /**
     * @desc  ._formBuilder.group is used to add validations for each field on the registration form
     */
    this.generalDetailsFormGroup = this._formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*')]],
      Phno: ['', [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')]],
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
      expire: ['', [Validators.required]],
      name: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern('[0-9]{5}')]]
    });
    this.changePasswordFormGroup = this._formBuilder.group({
      emailId: [{ Value: '', disabled: true }],
      password: ['', [Validators.required,Validators.pattern('[^\s]{6,13}')]],
      confirmpassword: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.user.login.password == this.initialPassword) {
      this.confirmpassword = "";
      this.store.dispatch(new UpdateUser(this.user));
    } else {
      if (this.user.login.password == this.confirmpassword) {
        this.store.dispatch(new UpdateUser(this.user));
      } else {
        alert("Password and Confirm Password must Match");
      }
    }

  }


}
