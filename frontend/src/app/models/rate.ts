export class Rate {

  constructor(
    public _id: String,
    public active: String,
    public coinname: String,
    public usdvalue: Number,
    public insert_date: Date,
    public modified_date: Date
  ) {

  }
}
