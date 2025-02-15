export type User={
    name:string;
    email:string;
    photo:string;
    gender:string;
    role:string;
    dob:string;
    _id:string;
};


export type Product = {
    name:string;
    photo:string;
    _id:string;
    category:string;
    price:number;
    stock:number;
    
};


export type ShippingInfo = {
    address:string;
    city:string;
    state:string;
    country:string;
    pinCode:string;
}

export type CartItem={
    productId:string;
    photo:string;
    name:string;
    price:number;
    quantity:number;
    stock:number;
}

export type OrderItem = Omit <CartItem, "stock"> & {_id:string};

export type Order = {
    orderItems:OrderItem[],
    shippingInfo: ShippingInfo,
    subtotal:number;
    tax:number;
    shippingCharges:number;
    discount:number;
    total:number;
    status:string;
    user:{
        _id:string;
        name:string;
    },
    _id:string;
}

 type CountAndChange={
    revenue: number;
    user: number;
    order:number;
    product: number;
}
type LatestTransactions ={
    id: string;
    discount:number;
    amount: number;
    quantity:number;
    status: string;
}
type RevenueDistribution={
    netMargin:number;
    marketingCost:number;
    burnt:number;
    productCost:number;
    discount:number;
}
type UserAgeGroup ={
    teen:number;
    adult:number;
    old:number;
}
type AdminCustomer ={
    admin:number;
    customer:number;
}
export type Stats ={
    categoryCount:Record<string, number>[];
    changePercent:CountAndChange;
    count:CountAndChange;
    chart:{
        order:number[];
        revenue: number[];
    },
    userRatio:{
        male:number;
        female:number;
    },
    latestTransactions:LatestTransactions[];
};

export type Pie={
    orderFulfillment:{
        processing:number;
        shipped:number;
        delivered:number;
    },
    productCategories: Record<string, number>[];
    productAvaliablity: {
        inStock:number;
        outStock:number;
    },
    revenueDistribution:RevenueDistribution;
    userAgeGroup:UserAgeGroup;
    adminCustomer:AdminCustomer;

}

export type Bar ={
    users :number[];
    products:number[];
    orders:number[];
}
export type Line = {
    products:number[];
    users: number[];
    discount: number[];
    revenue : number[];
}