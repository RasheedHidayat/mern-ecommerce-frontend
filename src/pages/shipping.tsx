import {useState, ChangeEvent, useEffect, FormEvent} from "react";
import {BiArrowBack} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { cartReducerInitialState } from "../types/reducer-types";
import axios from "axios";
import { server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";


const Shipping =()=>{
    const navigate= useNavigate();
    const {cartItems, total} = useSelector((state:{cartReducer:cartReducerInitialState})=>state.cartReducer);
    const dispatch = useDispatch();
    const[shippingInfo, setShippingInfo]= useState({
        address:"",
        city:"",
        state:"",
        country:"",
        pinCode:"",
    });

    const changeHandler=(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        let name=e.target.name;
        let value= e.target.value;
        setShippingInfo(prev=>({...prev, [name]:value}));

    }
    const submitHandler = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch(saveShippingInfo(shippingInfo));
        try{
            const {data} =await axios.post(`${server}/api/v1/payment/create`,{
                amount:total,

            },{
                headers:{
                    "Content-Type":"application/json",
                }
            });
            navigate("/pay",{
                state: data.clientSecret,
            })
        }
        catch(err){
            console.log(err);
            toast.error("Something Went Wrong");
        }
    }

    useEffect(()=>{
        if(cartItems.length<=0)  navigate("/cart");

    }, [cartItems])

    return(
        <div className="shipping">
            <button className="back-btn" onClick={()=>navigate("/cart")}><BiArrowBack /></button>
            <form onSubmit={submitHandler}>
                <h1>Shipping Address</h1>
                <input type="text" placeholder="Address" value={shippingInfo.address} name="address" onChange={changeHandler} />
                <input type="text" placeholder="City" value={shippingInfo.city} onChange={changeHandler} name="city" />
                <input type="text" placeholder="State" value={shippingInfo.state} onChange={changeHandler} name="state" />
                <select name="country" required={true} value={shippingInfo.country} onChange={changeHandler}>
                    <option value="">Choose Country</option>
                    <option value="india">India</option>
                </select>
                <input type="number" placeholder="Pin Code" value={shippingInfo.pinCode} onChange={changeHandler} name="pinCode" />
                <button type="submit">Pay Now</button>
            </form>
        </div>
    )
}

export default Shipping;