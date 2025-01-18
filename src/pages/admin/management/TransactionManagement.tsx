import AdminSidebar from "../../../components/admin/AdminSidebar.tsx";
import {useState} from "react";
import {OrderType,OrderItemType} from "../../../type.ts";
import {Link} from "react-router-dom";

let img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRugxnJy9YzBfKpQgJnPb2uQw1xG59oGkEFPuq5743Hn3kj8CvY1ARt6vhHEnwybOKgFWberA&s";
const orderItems:OrderItemType[]=[
    {
        name:"Puma Mouse",
        photo:img,
        _id:"dafhaks3423",
        quantity:4,
        price:1000,
    },
];
const TransactionManagement=()=>{
    const [order,setOrder]=useState<OrderType>({
        name:"abishak singh",
        address:"77 block street",
        city:"Neyword",
        state:"Neveda",
        country:"India",
        pinCode:903334,
        status:"Processing",
        subtotal:4000,
        discount:1200,
        shippingCharges:0,
        tax:200,
        total:4000+200+0-1200,
        orderItems,
        _id:"dajkf93hr",

    });

    const {name,country,city,state,pinCode,address,subtotal,total,shippingCharges,tax,status,discount} =order;
    const updateHandler=()=>{
        setOrder(prev=>({...prev,status:prev.status=="Processing"?"Shipped":"Delivered"}));
    }

    return(
        <div className="admin-container">
            <AdminSidebar />
            <main className="product-management">
                <section style={{padding:"2rem"}}>
                    <h1>Order Items</h1>
                        {
                            orderItems.map(orderItem=>(
                                <ProductCard name={orderItem.name} _id={orderItem._id} price={orderItem.price} photo={orderItem.photo} quantity={orderItem.quantity} />
                            ))
                        }
                </section>
                <article className="shipping-info-card">
                        <h1>Order Info</h1>
                        <h5>User Info</h5>
                        <p>Name: {name}</p>
                        <p>
                            Address: {`${address}, ${city}, ${state}, ${country} ${pinCode} `}
                        </p>
                        <h5>Amount Info</h5>
                        <p>SubTotal: {subtotal}</p>
                        <p>Shipping Charges: {shippingCharges}</p>
                        <p>Tax: {tax}</p>
                        <p>Discount: {discount}</p>
                        <p>Total: {total}</p>
                        <h5>Status Info</h5>
                        <p>Status:{" "}
                            <span className={status=="Delivered"?"purple":status=="Shipped"?"green":"red"}>{status}</span>
                        </p>
                        <button onClick={updateHandler}>Process Order</button>
                </article>
            </main>
        </div>
    );
};
const ProductCard=({name,price,photo,quantity,_id}:OrderItemType)=>(
    <div className="transaction-product-card">
        <img src={photo} alt="product" />
        <Link to={`/product/${_id}`}>{name}</Link>
        <span>${price} x {quantity} = ${price*quantity}</span>
    </div>
)
export default TransactionManagement;