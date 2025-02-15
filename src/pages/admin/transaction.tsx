import AdminSidebar from "../../components/admin/AdminSidebar.tsx";
import {ReactElement,useState, useEffect, useMemo} from "react";
import {Column} from "react-table";
import TableHOC from "../../components/admin/TableHOC.tsx";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../types/reducer-types.ts";
import { useAllOrdersQuery } from "../../redux/api/orderAPI.ts";
import { CustomError } from "../../types/api-types.ts";
import toast from "react-hot-toast";
import { SkeletonLoader } from "../../components/loader.tsx";

interface DataType {
    user:string,
    amount:number,
    discount:number,
    quantity:number,
    status:ReactElement,
    action:ReactElement,
}
const columns:Column<DataType>[]=[
    {
        Header:"User",
        accessor:"user",
    },
    {
        Header:"Amount",
        accessor:"amount",
    },
    {
        Header:"Discount",
        accessor:"discount",
    },
    {
        Header:"Quantity",
        accessor:"quantity",

    },
    {
        Header:"Status",
        accessor:"status",
    },
    {
        Header:"Action",
        accessor:"action",
    },
];

const Transaction=()=>{
    const { user } = useSelector((state:{userReducer:userReducerInitialState})=>state.userReducer);
    const {data, isLoading, isError, error} = useAllOrdersQuery(user!._id);
    const [rows, setRows]=useState<DataType[]>([]);

    if(isError){
        const err = error as CustomError;
        toast.error(err.data.message);
    }
    useEffect(()=>{
       if(data){
        let orders=  data.orders.map(i=>({
            user:i.user.name,
            amount:i.total,
            discount:i.discount,
            quantity:i.orderItems.length,
            status: <span className={i.status=="Processing"?"red":i.status=="Shipped"?"green":"purple"}>{i.status}</span>,
            action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }));

        setRows(orders)
        }
    },[data, isLoading])
    
    const MemoizedTable = useMemo(() => TableHOC<DataType>(columns, rows, "dashboard-product-box", "Transactions", true), [rows]);

    return(
        <div className="admin-container">
            <AdminSidebar />
            <main>{isLoading?<SkeletonLoader length={20}/>: <MemoizedTable/>}</main>
        </div>
    )
}
export default Transaction;