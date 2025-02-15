import AdminSidebar from "../../components/admin/AdminSidebar.tsx";
import TableHOC from "../../components/admin/TableHOC.tsx";
import { ReactElement, useState, useEffect, useMemo } from "react";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAllProductsQuery } from "../../redux/api/productAPI.ts";
import { server } from "../../redux/store.ts";
import toast from "react-hot-toast";
import { CustomError } from "../../types/api-types.ts";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../types/reducer-types.ts";
import { SkeletonLoader } from "../../components/loader.tsx";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Product = () => {
  const { user } = useSelector((state: { userReducer: userReducerInitialState }) => state.userReducer);
  const { data, isLoading, isError, error } = useAllProductsQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data?.products) {
      const result = data.products.map((p) => ({
        photo: <img src={`${server}/${p.photo}`} alt={p.name} />,
        name: p.name,
        price: p.price,
        stock: p.stock,
        
        action: <Link to={`/admin/product/${p._id}`}>Manage</Link>,
      }));
      setRows(result);
    }
  }, [data]);

  // Memoize the Table component
  const MemoizedTable = useMemo(() => TableHOC<DataType>(columns, rows, "dashboard-product-box", "Products", true), [rows]);


  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <SkeletonLoader length={20} /> : <MemoizedTable />}</main>

      <Link to={"/admin/product/new"} className={"create-product-btn"}>
        <FaPlus />
      </Link>
    </div>
  );
};

export default Product;