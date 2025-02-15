import { ReactElement, useEffect, useState } from "react";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { useAllOrdersQuery } from "../redux/api/orderAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { SkeletonLoader } from "../components/loader";
import { RootState } from "../redux/store";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action:ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header:"Action",
    accessor:"action",
  },
];

const Orders = () => {

  const {user} = useSelector((state:RootState)=>state.userReducer );
  const {data, isLoading, isError, error} = useAllOrdersQuery(user!._id);


  const [rows, setRows] = useState<DataType[]>([]);

  if(isError){
    const err = error as CustomError;
    toast.error(err.data.message);
  };

  useEffect(()=>{
    if(data){
      const orders = data.orders.map(i=>({
        _id:i._id,
        amount:i.total,
        quantity: i.orderItems.length,
        discount:i.discount,
        status: <span className={i.status == "Processing"?"red":i.status=="Shipped"?"green":"purple"}>{i.status}</span>,
        action: <Link to={`/admin/transaction/${i._id}`}>View</Link>
      }));
      setRows(orders)
    }
  },[data])


  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      { isLoading? <SkeletonLoader length={20} /> : Table}
    </div>
  );
};

export default Orders;