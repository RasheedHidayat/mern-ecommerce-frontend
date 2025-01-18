import AdminSidebar from "../../../components/admin/AdminSidebar.tsx";
import {PieChart,DoughnutChart} from "../../../components/admin/Charts.tsx"; 
import Data from "../../../assets/data.json";

const PieCharts =()=>{
    return(
        <div className="admin-container">
            <AdminSidebar />
            <main className="chart-container">
                <h1>Pie & Doughnut Charts</h1>
                <section>
                    <div>
                        <PieChart data={[12,9,13]} labels={["Processing","Shipped","Delivered"]} backgroundColor={["hsl(110,80%,80%)",
                            "hsl(110,80%,50%)",
                            "hsl(110,40%,50%)"
                        ]} offset={[0,0,50]} />
                    </div>
                    <h2>Order Fulfillment ratio</h2>
                </section>
                <section>
                    <div>
                        <DoughnutChart data={Data.categories.map(i=>(i.value))}
                         labels={Data.categories.map(i=>i.heading)} backgroundColor={Data.categories.map(i=>`hsl(${i.value*4},${i.value*2}%,50%)`)} 
                         offset={[0,0,50]}
                         />
                    </div>
                    <h2>Product Categories Ratio</h2>
                </section>
                <section>
                    <div>
                        <DoughnutChart labels={["In Stock","Out of Stock"]} data={[20,40]} backgroundColor={["hsl(269,80%,40%)","rgb(53,162,255)"]} cutout="70%" offset={[0,80]}  />
                    </div>
                    <h2>Stock Availability</h2>
                </section>
                <section>
                    <div>
                        <DoughnutChart 
                        labels={["Marketing Cost","Discount","Burnt","Product Cost","Not Margin"]}
                        data={[32,18,5,20,25]}
                        backgroundColor={["hsl(110, 80%, 40%)", "hsl(19, 80%, 40%)", "hsl(69, 80%, 40%), hsl(300, 80%, 40%)","rgb(53,162, 255)"]}
                        legends={false}
                        offset={[20,30,20,30,80]}
                        />
                    </div>
                    <h2>Revenue Distribution</h2>
                </section>
                <section>
                    <div>
                        <DoughnutChart labels={["Teenager (Below 20)","Adult (20-40)","Older (above 40)"]} data={[30,250,70]} backgroundColor={[`hsl(10,${80}%),${80}%`,`hsl(10,${80}%,50%)`,`hsl(10,${40},50%)`]}
                        offset={[0,0,50]}
                        />
                    </div>
                    <h2>Users Age Group</h2>
                </section>
                <section>
                    <div>
                        <DoughnutChart labels={["Admin","Customers"]} data={[40,250]}
                            backgroundColor={[`hsl(335,100%,38%)`,`hsl(44, 98%, 50%)`]}
                            offset={[0,80]}
                        />
                    </div>
                </section>
            </main>
        </div>
    )
}
export default PieCharts;