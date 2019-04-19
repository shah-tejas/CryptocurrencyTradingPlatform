export class Rate {

  constructor(
    public _id: String,
    public active: String,
    public coinname: String,
    public insert_date: Date,
    public modified_date: Date
  ) {
    this.active = "I";
    this.insert_date = new Date(Date.now());
    this.modified_date = new Date(Date.now());
  }
}
