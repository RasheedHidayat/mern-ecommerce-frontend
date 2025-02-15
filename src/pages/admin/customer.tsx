import AdminSidebar from "../../components/admin/AdminSidebar.tsx";
import {Column} from "react-table";
import {useState, ReactElement, useEffect, useMemo} from "react";
import TableHOC from "../../components/admin/TableHOC.tsx";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { useAllUsersQuery, useDeleteUserMutation } from "../../redux/api/userAPI.ts";
import { responseToast } from "../../utils/features.ts";
import { SkeletonLoader } from "../../components/loader.tsx";
import { CustomError } from "../../types/api-types.ts";
import toast from "react-hot-toast";
interface DataType{
    avater:ReactElement,
    name:string,
    email:string,
    gender:string,
    role:string,
    action:ReactElement,

};
const columns:Column<DataType>[]=[
    {
        Header:"Avater",
        accessor:"avater",
    },
    {
        Header:"Name",
        accessor:"name",
    },
    {
        Header:"Email",
        accessor:"email",
    },
    {
        Header:"Gender",
        accessor:"gender",
    },
    {
        Header:"Role",
        accessor:"role",
    },
    {
        Header:"Action",
        accessor:"action",
    }
];
const Customer=()=>{
    const {user} = useSelector((state:RootState)=>state.userReducer);
    const {isLoading, isError,  data, error, refetch} = useAllUsersQuery(user?._id!);
    const [deleteUser] = useDeleteUserMutation();
    const [rows, setRows] =useState<DataType[]>([]);
  const Table = useMemo(() => TableHOC<DataType>(columns, rows, "dashboard-product-box", "Customers", true), [rows]);

    const deleteHandler = async(userId:string)=>{
        const res = await deleteUser({adminUserId: user?._id!, userId: userId});
        responseToast(res, null, "");
        refetch();
    }
    useEffect(()=>{
        if(data){

            let customers= data.users.map((i)=>({
        name:i.name,
        email:i.email,
        gender:i.gender,
        role:i.role,
        avater : <img src={i.photo} alt={i.name} />,
        action : <button onClick={()=>deleteHandler(i._id!)}>
            <FaTrash />
        </button>
            }));
            setRows(customers);
        }
    },[data])
    if(isError){
        let err = error as CustomError;
        toast.error(err.data.message);
    }
    return( 
        <div className="admin-container">
            <AdminSidebar />
            <main>{isLoading? <SkeletonLoader/> :<Table/>}</main>
        </div>
    )
}
export default Customer;