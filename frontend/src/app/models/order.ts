export class Order {
  public _id: String;
  public user_id: String;
  public status: String;
  public matched_order_id: String;
  public buy_or_sell: String;
  public from_coin: String;
  public from_qty: Number;
  public from_value: Number;
  public to_coin: String;
  public to_qty: Number;
  public to_value: Number;
  public created_date: Date;
  public completion_date: Date;
  constructor() { }
}
