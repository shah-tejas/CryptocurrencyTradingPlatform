import {Coin} from './coin';

export class Wallet {
  _id: number;
  user_id: string;
  usd_value: number;
  createdDate: Date;
  modifiedDate: Date;
  coins: Array<Coin>;

  constructor(user_id: string, usd_value: number, coins: Array<Coin>){
    this.user_id = user_id;
    this.usd_value = usd_value;
    this.coins = coins;
  }
}
