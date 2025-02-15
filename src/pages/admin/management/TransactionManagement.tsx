import AdminSidebar from "../../../components/admin/AdminSidebar.tsx";
import {OrderItemType} from "../../../type.ts";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../types/reducer-types.ts";
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from "../../../redux/api/orderAPI.ts";
import { Order } from "../../../types/types.ts";
import { SkeletonLoader } from "../../../components/loader.tsx";
import { server } from "../../../redux/store.ts";
import { responseToast } from "../../../utils/features.ts";

const defaultData:Order = {
    shippingInfo:{
        address:"",
        city:"",
        state:"",
        country:"",
        pinCode:"",
    },
    orderItems:[],
    user:{
        name:"",
        _id:""
    },
    status:"",
    subtotal:0,
    discount:0,
    total:0,
    shippingCharges:0,
    tax:0,
    _id:"",
}
const TransactionManagement=()=>{
    const {user} = useSelector((state:{userReducer:userReducerInitialState})=>state.userReducer);
    const params = useParams();
    const navigate = useNavigate();
    const {data, isError, isLoading} = useOrderDetailsQuery(params.id!);
    const [updateOrder] = useUpdateOrderMutation();
    const [deleteOrder] = useDeleteOrderMutation();
    const {
     shippingInfo:{address, city, state, country, pinCode},
     orderItems, user:{name}, status, subtotal, total, discount , shippingCharges, tax } =  data?.order || defaultData;

    const updateHandler=async()=>{
       let res=  await updateOrder({userId:user?._id!, orderId:params.id!});
        responseToast(res, navigate, "/admin/transaction");
    }

    const deleteHandler = async()=>{
        let res= await deleteOrder({userId:user?._id!, orderId:params.id!});
        responseToast(res, navigate, "/admin/transaction");
    }
    if(isError) return <Navigate to={"/404"} />
    return(
        <div className="admin-container">
            <AdminSidebar />
            <main className="product-management">
                {
                    isLoading?
                    <SkeletonLoader />
                     :
            <>
                <section style={{padding:"2rem"}}>
                    <h1>Order Items</h1>
                        {
                            orderItems.map(orderItem=>(
                                <ProductCard name={orderItem.name} _id={orderItem._id} price={orderItem.price} photo={orderItem.photo} quantity={orderItems.length} />
                            ))
                        }
                </section>
                <article className="shipping-info-card">
                        <span className="del-product" onClick={deleteHandler}><FaTrash /></span>
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
            </>}
            </main>
        </div>
    );
};
const ProductCard=({name,price,photo,quantity,_id}:OrderItemType)=>(
    <div className="transaction-product-card">
        <img src={`${server}/${photo}`} alt="product" />
        <Link to={`/product/${_id}`}>{name}</Link>
        <span>${price} x {quantity} = ${price*quantity}</span>
    </div>
)
export default TransactionManagement;