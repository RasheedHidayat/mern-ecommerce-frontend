import AdminSidebar from "../../components/admin/AdminSidebar.tsx";
import {ReactElement,useState, useCallback} from "react";
import {Column} from "react-table";
import TableHOC from "../../components/admin/TableHOC.tsx";
import {Link} from "react-router-dom";

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

const arr:DataType[]=[
    {
        user:"Charas",
        amount:399,
        discount:100,
        quantity:19,
        status: <span className={"red"}>Processing</span>,
        action: <Link to={"/admin/transaction/djf343"} >Manage</Link>,
    },
    {
        user:"Denmark",
        amount:3599,
        discount:544,
        quantity:20,
        status: <span className={"green"}>Shipped</span>,
        action: <Link to={"/admin/transaction/adfan34"}>Manage</Link>,
    },
    {
        user:"jemmy",
        amount:8090,
        discount:200,
        quantity:10,
        status: <span className={"purple"}>Delivered</span>,
        action: <Link to={"/admin/transaction/adsdfsf"}>Manage</Link>,
    }
];
const Transaction=()=>{
    const [data]=useState<DataType[]>(arr);
    const Table= useCallback(TableHOC<DataType>(columns,data,"dashboard-product-box","Transactions",true),[])
    return(
        <div className="admin-container">
            <AdminSidebar />
            <main>{Table()}</main>
        </div>
    )
}
export default Transaction;