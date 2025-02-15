import AdminSidebar from "../../components/admin/AdminSidebar.tsx";
import {BsSearch} from "react-icons/bs";
import {FaRegBell} from "react-icons/fa";
import {HiTrendingUp,HiTrendingDown} from "react-icons/hi";
import userImage from "../../assets/images/user.png";
import {BarChart,DoughnutChart} from "../../components/admin/Charts.js";
import {BiMaleFemale} from "react-icons/bi";
import Table from "../../components/admin/DashboardTable.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { useStatsQuery } from "../../redux/api/dashboardAPI.ts";
import { SkeletonLoader } from "../../components/loader.tsx";
import { Navigate } from "react-router-dom";
import { getLastMonths } from "../../utils/features.ts";
const Dashboard =()=>{
    const {last6Month} = getLastMonths();
    const {user} = useSelector((state:RootState)=>state.userReducer);
    const {data, isError, isLoading}  = useStatsQuery(user?._id!);
    if(isError) return <Navigate to={"/"} />
    const stats = data?.stats!;
    return(

        <div className="admin-container">
            <AdminSidebar />
            <main className="dashboard">
                {
                    isLoading? <SkeletonLoader />
                    :
            <>
                <div className="bar">
                    <BsSearch />
                    <input type="text" name="" placeholder={"Search for data, users, docs"} id="" />
                    <FaRegBell />
                    <img src={user?.photo || userImage} alt="" />
                </div>
                <section className="widget-container">
                    <WidgetItem heading="Revenue" amount={true} value={stats.count.revenue} percent={stats.changePercent.revenue} color={"rgb(0,115,255)"} />
                    <WidgetItem heading="Users" value={stats.count.user} percent={stats.changePercent.user} color={"rgb(0 198 202)"} />
                    <WidgetItem heading="Transaction" value={stats.count.order} percent={stats.changePercent.order} color={"rgb(255 196 0)"} />
                    <WidgetItem heading="Products" value={stats.count.product} percent={stats.changePercent.product} color={"rgb(76 0 255)"} />
                </section>
                <section className="graph-container">
                    <div className="revenue-chart">
                        <h2>Revenue & Transaction</h2>
                        {/* Graph here */}
                        <BarChart data_1={stats.chart.revenue} horizontal={false} data_2={stats.chart.order } title_1={"Revenue"} title_2={"Transaction"}
                        bgColor_1={"rgb(0,115,255)"}
                        bgColor_2={"rgba(53,162,235,0.8)"}
                        labels={last6Month}
                        />
                    </div>
                    <div className="dashboard-categories">
                        <h2>Inventory</h2>
                        {
                            stats.categoryCount.map((cat)=>{
                                const [heading, value]= Object.entries(cat)[0];
                                return <CategoryItem key={heading} heading={heading} value={value} color={`hsl(${Math.random()*20*10},100%,50%)`} />
                            })
                        }
                    </div>
                </section>
                <section className="transaction-container">
                    <div className="gender-chart">
                        <h2>Gender Ratio </h2>
                        {/* Chart  */}
                        <DoughnutChart labels={["Male","Female"]} data={[stats.userRatio.male, stats.userRatio.female]} cutout={90} backgroundColor={["hsl(340,82%,56%)","rgba(53,162,235,0.8)"]}  />
                        <p> <BiMaleFemale /></p>
                    </div>
                    {/* Table */}
                        <Table data={stats.latestTransactions} />
                </section>
            </>
                }
            </main>
        </div>
    )
}
type WidgetItemProps={
    heading:string;
    value:number;
    percent:number;
    color:string;
    amount?:boolean;
     
};
const WidgetItem=({heading,value,percent,color,amount=false}:WidgetItemProps)=>{
    return (
        <article className="widget">
            <div className="widget-info">
                <p>{heading}</p>
                <h4>{amount?`$${value}`:value}</h4>
                {
                    percent>0?<span className="green"><HiTrendingUp /> + {percent>0 && percent>10000 ?9999:percent}%</span>: <span className="red"><HiTrendingDown />{percent<0 && percent<-10000?-9999:percent}%</span>
                }
            </div>
            <div className="widget-circle" style={{backgroundImage:`conic-gradient(${color} ${(Math.abs(percent)/100)*360}deg, rgb(255,255,255) 0 )`}}>
                <span style={{color}}>
                    {percent>0 &&` ${percent >10000? 9999 : percent}%`}
                    {percent<0 && `${percent<-10000? -9999 : percent}%`}
                </span>
            </div>
        </article>
    )
}
interface categoryItemProps{
    heading:string,
    color:string,
    value:number,
}
const CategoryItem=({heading,color,value}:categoryItemProps)=>(
    <div className="category-item">
        <h5>{heading}</h5>
        <div>
            <div style={{backgroundColor:color,width:`${value}%`}}>

            </div>
        </div>
        <span>{value}</span>
    </div>
);

export default Dashboard; 