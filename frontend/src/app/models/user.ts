import { Address } from './address';
import { Payment } from './payment';
import { Login } from './login';

/**
 * @desc User model
 */
export class User {
    _id :String;
    fname: String;
    lname: String;
    emailId: String;
    Phno: Number;
    address: Address;
    payment: Payment;
    login: Login;

    constructor(){
        /**
         * @desc creating objects of address, payment,Login
         */
        this.address =  new Address();
        this.payment = new Payment();
        this.login = new Login();

    }

    // constructor(fname: String, lname: String, emailId: String, Phno: Number, address: Address, payment: Payment, login: Login) {
    //     this.fname = fname;
    //     this.lname = lname;
    //     this.emailId = emailId;
    //     this.Phno = Phno;
    //     this.address = address;
    //     this.payment = payment;
    //     this.login = login;
    // }
}
