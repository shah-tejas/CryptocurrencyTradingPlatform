export class CoinOrder {
  _id: number;
  coinname: string;
  coinqty: number;
  usdvalue: number;

  constructor(coin_name: string, coin_qty: number, usdvalue: number) {
    this.coinname = coin_name;
    this.coinqty = coin_qty;
    this.usdvalue = usdvalue;
  }

}
