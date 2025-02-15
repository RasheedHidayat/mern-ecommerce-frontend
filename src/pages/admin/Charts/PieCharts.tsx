import AdminSidebar from "../../../components/admin/AdminSidebar.tsx";
import {PieChart,DoughnutChart} from "../../../components/admin/Charts.tsx"; 
import { usePieQuery } from "../../../redux/api/dashboardAPI.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store.ts";
import { CustomError } from "../../../types/api-types.ts";
import toast from "react-hot-toast";
import { SkeletonLoader } from "../../../components/loader.tsx";
import { Navigate } from "react-router-dom";

const PieCharts =()=>{
    const {user} = useSelector((state:RootState)=>state.userReducer);
    const {data, error, isError, isLoading} = usePieQuery(user?._id!);
    if(isError) return <Navigate to={"/admin/dashboard"} />
    const order = data?.charts.orderFulfillment!;
    const categories = data?.charts.productCategories!;
    const stock = data?.charts.productAvaliablity!;
    const revenue = data?.charts.revenueDistribution!;
    const ageGroup = data?.charts.userAgeGroup!;
    const adminCustomer = data?.charts.adminCustomer!;

    if(isError){
        const err = error as CustomError;
        toast.error(err.data.message);
    }
    return(
        <div className="admin-container">
            <AdminSidebar />
            <main className="chart-container">
                {
                    isLoading? <SkeletonLoader length={20} />:
            <>

                <h1>Pie & Doughnut Charts</h1>
                <section>
                    <div>
                        <PieChart data={[order.delivered, order.shipped, order.processing]} labels={["Delivered", "Shipped", "Processing"]} backgroundColor={ Array(3).map(()=>`hsl(${22*Math.random()*8}, ${Math.random()*8*19}%, 10%)`)}
                     offset={[0,0,50]} />
                    </div>
                    <h2>Order Fulfillment ratio</h2>
                </section>
                <section>
                    <div>
                        <DoughnutChart data={categories.map(i=>Object.values(i)[0])}
                         labels={categories.map(i=>Object.keys(i)[0])} backgroundColor={categories.map(()=>`hsl(${Math.random()*10*23},${Math.random()*10*10}%,50%)`)} 
                         offset={[0,0,50]}
                         />
                    </div>
                    <h2>Product Categories Ratio</h2>
                </section>
                <section>
                    <div>
                        <DoughnutChart labels={["In Stock","Out of Stock"]} data={[stock.inStock,stock.outStock]} backgroundColor={["hsl(269,80%,40%)","rgb(53,162,255)"]} cutout="70%" offset={[0,80]}  />
                    </div>
                    <h2>Stock Availability</h2>
                </section>
                <section>
                    <div>
                        <DoughnutChart 
                        labels={["Marketing Cost","Discount","Burnt","Product Cost","Net Margin"]}
                        data={[revenue.marketingCost,revenue.discount,revenue.burnt,revenue.productCost,revenue.netMargin]}
                        backgroundColor={["hsl(110, 80%, 40%)", "hsl(19, 80%, 40%)", "hsl(69, 80%, 40%), hsl(300, 80%, 40%)","rgb(53,162, 255)"]}
                        legends={false}
                        offset={[20,30,20,30,80]}
                        />
                    </div>
                    <h2>Revenue Distribution</h2>
                </section>
                <section>
                    <div>
                        <DoughnutChart labels={["Teenager (Below 20)","Adult (20-40)","Older (above 40)"]} data={[ageGroup.teen,ageGroup.adult,ageGroup.old]} backgroundColor={[`hsl(10,${80}%),${80}%`,`hsl(10,${80}%,50%)`,`hsl(10,${40},50%)`]}
                        offset={[0,0,50]}
                        />
                    </div>
                    <h2>Users Age Group</h2>
                </section>
                <section>
                    <div>
                        <DoughnutChart labels={["Admin","Customers"]} data={[adminCustomer.admin,adminCustomer.customer]}
                            backgroundColor={[`hsl(335,100%,38%)`,`hsl(44, 98%, 50%)`]}
                            offset={[0,80]}
                        />
                    </div>
                    <h2>Admin and Customer</h2>
                </section>
            </>
            }
            </main>
        </div>
    )
}
export default PieCharts;