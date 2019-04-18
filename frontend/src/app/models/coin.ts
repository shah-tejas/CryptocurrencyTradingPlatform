export class Coin {
  _id: number;
  coin_name: string;
  coin_qty: number;
  coin_rate: number;

  constructor(coin_name: string, coin_qty: number) {
    this.coin_name = coin_name;
    this.coin_qty = coin_qty;
  }

}
