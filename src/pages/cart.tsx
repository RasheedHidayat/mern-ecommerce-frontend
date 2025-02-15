import {useState, useEffect} from "react";
import {VscError} from "react-icons/vsc";
import CartItemCard from "../components/cart-item.tsx";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartReducerInitialState } from "../types/reducer-types.ts";
import { CartItem } from "../types/types.ts";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer.ts";
import axios from "axios";
import { server } from "../redux/store.ts";


const Cart=()=>{
    const {cartItems, subtotal, tax, total, discount, shippingCharges} = useSelector((state:{cartReducer:cartReducerInitialState})=>state.cartReducer);
    const dispatch = useDispatch();
    const[couponCode, setCouponCode] = useState<string>("");
    const[isValidCouponCode, setIsValidCouponCode]= useState<boolean>(false);

    const incrementHandler = (cartItem:CartItem)=>{
        if(cartItem.quantity >= cartItem.stock) return;
        dispatch(addToCart({...cartItem, quantity:cartItem.quantity + 1}));
    };

    const decrementHandler = (cartItem:CartItem)=>{
        if(cartItem.quantity <= 1) return;
        dispatch(addToCart({...cartItem, quantity:cartItem.quantity -1}));
    }
    const removeHandler = (id:string)=>{
        dispatch(removeCartItem(id));
    }
    useEffect(()=>{
        const {token:cancelToken, cancel} = axios.CancelToken.source();

        const timeoutId= setTimeout(()=>{
            axios.get(`${server}/api/v1/payment/coupon/discount?coupon=${couponCode}`, {cancelToken}).then((res)=>{
                console.log(res.data);
                dispatch(discountApplied(res.data.discount));
                dispatch(calculatePrice());
                setIsValidCouponCode(true);
            }).catch((res)=>{
                console.log(res.response.data.message);
                dispatch(discountApplied(0))
                dispatch(calculatePrice());
                setIsValidCouponCode(false);
            })
        },1000)

        return()=> {
            clearTimeout(timeoutId);
            cancel();
            setIsValidCouponCode(false);
        };
    },[couponCode]);


    useEffect(()=>{
        dispatch(calculatePrice())
    }, [cartItems])

    return(
        <div className="cart">
            <main>
                {
                    cartItems.length>0 ?
                    cartItems.map((i, index)=>(
                            <CartItemCard
                            removeHandler={removeHandler}
                            incrementHandler={incrementHandler} decrementHandler={decrementHandler} key={index} 
                            cartItem={i}
                            
                            />
                   )):
                   (
                    <h1>No items Added</h1>
                   )
                }
            </main>
            <aside>
                <p>SubTotal: INR{subtotal}</p>
                <p>Shipping Charges: INR{shippingCharges}</p>
                <p>Tax: INR{tax}</p>
                 <p>
                    Discount: <em>- INR{discount}</em>
                 </p>
                 <p>
                    <b>Total: INR{total}</b>
                 </p>
                 <input type="text" placeholder="Coupon Code" value={couponCode} onChange={(e)=>setCouponCode(e.target.value)} />


                {
                    couponCode && ( isValidCouponCode ? <span className="green">INR{discount} off using the <code>{couponCode}</code></span> : <span className="red">Invalid Coupon <VscError /></span>)
                }

                {
                    cartItems.length >0 && <Link to={"/shipping"}>Checkout</Link> 
                }

            </aside>
        </div>
    )
};

export default Cart;