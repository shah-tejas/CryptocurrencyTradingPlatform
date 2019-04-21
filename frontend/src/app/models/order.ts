// Class for the Orders being placed on the crypto-currency exchange
export class Order {
    // Fields
    _id: string;
    user_id: string;
    status: string;
    matched_order_id: string;
    buy_or_sell: string;
    from_coin: string;
    from_qty: number;
    from_value: number;
    to_coin: string;
    to_qty: number;
    to_value: number;
    created_date: Date;
    completion_date: Date

  // Constructor
  constructor(  ) { }
}
