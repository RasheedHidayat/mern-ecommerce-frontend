import AdminSidebar from "../components/AdminSidebar.tsx";
import {BsSearch} from "react-icons/bs";
import {FaRegBell} from "react-icons/fa";
import {HiTrendingUp,HiTrendingDown} from "react-icons/hi";
import user from "../assets/images/user.png";
import data from "../assets/data.json";
import {BarChart,DoughnutChart} from "../components/Charts.js";
import {BiMaleFemale} from "react-icons/bi";
import Table from "../components/DashboardTable.tsx";
const Dashboard =()=>{
    return(
        <div className="admin-container">
            <AdminSidebar />
            <main className="dashboard">
                <div className="bar">
                    <BsSearch />
                    <input type="text" name="" placeholder={"Search for data, users, docs"} id="" />
                    <FaRegBell />
                    <img src={user} alt="" />
                </div>
                <section className="widget-container">
                    <WidgetItem heading="Revenue" amount={true} value={340} percent={40} color={"rgb(0,115,255)"} />
                    <WidgetItem heading="Users" value={400} percent={40} color={"rgb(0 198 202)"} />
                    <WidgetItem heading="Transaction" value={23000} percent={80} color={"rgb(255 196 0)"} />
                    <WidgetItem heading="Products" value={1000} percent={30} color={"rgb(76 0 255)"} />
                </section>
                <section className="graph-container">
                    <div className="revenue-chart">
                        <h2>Revenue & Transaction</h2>
                        {/* Graph here */}
                        <BarChart data_1={[100,200,300,400,500,535,600,900]} horizontal={false} data_2={[50,35,342,311,457,800] } title_1={"Revenue"} title_2={"Transaction"}
                        bgColor_1={"rgb(0,115,255)"}
                        bgColor_2={"rgba(53,162,235,0.8)"}
                        
                        />
                    </div>
                    <div className="dashboard-categories">
                        <h2>Inventory</h2>
                        {
                            data.categories.map((cat)=>(
                                <CategoryItem key={cat.heading} heading={cat.heading} value={cat.value} color={`hsl(${cat.value*3},100%,50%)`} />
                            ))
                        }
                    </div>
                </section>
                <section className="transaction-container">
                    <div className="gender-chart">
                        <h2>Gender Ratio </h2>
                        {/* Chart  */}
                        <DoughnutChart labels={["Male","Female"]} data={[12,19]} cutout={90} backgroundColor={["hsl(340,82%,56%)","rgba(53,162,235,0.8)"]}  />
                        <p> <BiMaleFemale /></p>
                    </div>
                    {/* Table */}
                        <Table data={data["transaction"]} />
                </section>
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
                    percent>0?<span className="green"><HiTrendingUp /> + {percent}%</span>: <span className="red"><HiTrendingDown />{percent}%</span>
                }
            </div>
            <div className="widget-circle" style={{backgroundImage:`conic-gradient(${color} ${(Math.abs(percent)/100)*360}deg, rgb(255,255,255) 0 )`}}>
                <span style={{color}}>{percent}%</span>
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