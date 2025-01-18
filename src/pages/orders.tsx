import TableHOC from "../components/admin/TableHOC.tsx";
import {ReactElement, useState} from "react";
import {Link} from "react-router-dom";
import {Column} from "react-table";


type DataType={
    _id:string,
    amount:number,
    discount:number,
    quantity:number,
    status:ReactElement,
    action:ReactElement,
};

const Orders=()=>{
    const [rows] = useState<DataType[]>([
        {
            _id:"dkflsf343kehklfjsdfdasdsf",
            amount:45454,
            quantity:23,
            discount:5666,
            status: <span className="red">Processing</span>,
            action: <Link to={`order/dkflsf343kehklfjsdfdasdsf`}>View</Link>

        }
    ]);

    const column:Column<DataType>[]=[
        {
            Header:"Id",
            accessor:"_id",
        },
        {
            Header:"Quantity",
            accessor:"quantity",
        },
        {
            Header:"Discount",
            accessor:"discount",
        },
        {
            Header:"Amount",
            accessor:"amount",
        },
        {
            Header:"Status",
            accessor:"status",
        },
        {
            Header:"Action",
            accessor:"action",
        },
    ]

    const Table =TableHOC<DataType>(column,rows,"dashboard-product-box","Orders",true)();     
    return(
        <div className="container">
            <h1>My Orders</h1>
            {
                Table
            }
        </div>
    )
}

export default Orders;