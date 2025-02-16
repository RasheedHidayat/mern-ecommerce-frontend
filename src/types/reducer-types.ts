import { CartItem, ShippingInfo, User } from "./types";

export interface userReducerInitialState{
    user: User | null,
    loading:boolean,
    
}

export interface cartReducerInitialState{
    loading:boolean;
    cartItems:CartItem[];
    subtotal:number;
    shippingCharges:number;
    total:number;
    tax:number;
    discount:number;
    shippingInfo:ShippingInfo,

};