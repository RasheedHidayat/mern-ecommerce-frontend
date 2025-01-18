import {useState, ChangeEvent} from "react";
import {BiArrowBack} from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const Shipping =()=>{
    const navigate= useNavigate();

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
    return(
        <div className="shipping">
            <button className="back-btn" onClick={()=>navigate("/cart")}><BiArrowBack /></button>
            <form>
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