import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar.tsx";
import {LineChart} from "../../../components/admin/Charts.tsx";
import { getLastMonths } from "../../../utils/features.ts";
import { RootState } from "../../../redux/store.ts";
import { useLineQuery } from "../../../redux/api/dashboardAPI.ts";
import { CustomError } from "../../../types/api-types.ts";
import toast from "react-hot-toast";
import { SkeletonLoader } from "../../../components/loader.tsx";

const {last12Month:month} = getLastMonths();
const LineCharts=()=>{
    const {user} = useSelector((state:RootState)=>state.userReducer);
    const {isLoading, isError, error, data} = useLineQuery(user?._id!);
    if(isError){
        const err =error as CustomError;
        toast.error(err.data.message);
    }
    const products = data?.charts.products || [];
    const revenues = data?.charts.revenue || [];
    const users = data?.charts.users || [];
    const discount = data?.charts.discount || [];
    return(
        <div className="admin-container">
            <AdminSidebar />
            <main className="chart-container">
                <h1>Line Charts</h1>
                {
                    isLoading? <SkeletonLoader length={15} /> :
            <>
                <section>
                    <LineChart data={users}
                        label="Users"
                        borderColor="rgb(53, 162, 255)"
                        backgroundColor="rgba(53,162, 255,0.5)"
                        labels={month}
                    />
                    <h2>Active Users</h2>
                </section>
                <section>
                    <LineChart data={products}
                        backgroundColor="hsla(269, 80%, 40%, 0.4)"
                        borderColor="hsl(269,80%,40%)"
                        label="Products"
                        labels={month}
                    />
                    <h2>Total Product (SKU)</h2>
                </section>
                <section>
                    <LineChart data={revenues} 
                        label="Revenue"
                        borderColor="hsl(129,80%,40%)"
                        backgroundColor="hsla(129,80%, 40%, 0.4)"
                        labels={month}
                    />
                    <h2>Total Revenue</h2>
                </section>
                <section>
                    <LineChart data={discount} 
                        backgroundColor={"hsla(29,80%,40%,0.4)"}
                        borderColor="hsl(29, 80%, 40%)"
                        label="Discount"
                        labels={month}
                    />
                    <h2>Discount Allotted</h2>
                </section>

            </>
                 }
            </main>
        </div>
    )
}
export default LineCharts;