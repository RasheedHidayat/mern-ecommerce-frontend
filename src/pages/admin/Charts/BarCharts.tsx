import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar.tsx";
import {BarChart} from "../../../components/admin/Charts.tsx";
import { RootState } from "../../../redux/store.ts";
import { useBarQuery } from "../../../redux/api/dashboardAPI.ts";
import { CustomError } from "../../../types/api-types.ts";
import toast from "react-hot-toast";
import { SkeletonLoader } from "../../../components/loader.tsx";
import { getLastMonths } from "../../../utils/features.ts";

const {last12Month, last6Month} =getLastMonths();
const BarCharts=()=>{

    const {user} = useSelector((state:RootState)=>state.userReducer);
    const {isLoading, isError, error, data} = useBarQuery(user?._id!);
    const products = data?.charts.products || [];
    const orders = data?.charts.orders || [];
    const users = data?.charts.users || [];
    if(isError){
        const err = error as CustomError;
        toast.error(err.data.message);
    }
    return(
        <div className="admin-container">
            <AdminSidebar />
            <main className="chart-container">
                <h1>Bar Charts</h1>
                { isLoading? <SkeletonLoader length={20} /> :
              <>
                <section>
                    <BarChart data_1={products} data_2={users} title_1="Products" title_2="Users"
                    bgColor_1={"hsl(260,50%,30%)"}
                    bgColor_2={"hsl(360,90%,90%)"}
                    labels={last6Month}
                    />
                    <h2>Top Selling Products & Top Customers</h2>
                </section>
                <section>
                    <BarChart data_1={orders} data_2={[]} title_1={"Orders"} 
                    title_2={""} bgColor_1={"hsl(180, 40%, 50%)"}
                    bgColor_2=""
                    labels={last12Month}
                    horizontal={true}
                    />
                    <h2>Orders throughout the years</h2>
                </section>
              </>
                }
            </main>
        </div>
    )
}
export default BarCharts;