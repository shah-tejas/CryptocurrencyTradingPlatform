// Class for the Orders being placed on the crypto-currency exchange
export class Order {
    // Fields
    _id: String;
    user_id: String;
    status: String;
    matched_order_id: String;
    buy_or_sell: String;
    from_coin: String;
    from_qty: Number;
    from_value: Number;
    to_coin: String;
    to_qty: Number;
    to_value: Number;
    created_date: Date;
    completion_date: Date

  // Constructor
  constructor(  ) { }
}
