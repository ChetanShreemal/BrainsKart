export interface IOrder {
  _id : string;
  name : string;
  email : string;
  mobile : string;
  items : [
    {
      name : string;
      price : number;
      qty : number;
    }
  ],
  total : number;
  tax : number;
  created : string;
}
