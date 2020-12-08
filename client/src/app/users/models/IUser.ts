import {IAddress} from "./IAddress";

export interface IUser {
  _id?:string;
  name : string;
  email : string;
  password : string;
  avatar? : string;
  isAdmin? : string;
  address? : IAddress
}
