import {Location,Link,useLocation} from "react-router-dom";
import {IconType} from "react-icons";
import {MdDashboard} from "react-icons/md";
import {RiShoppingBag3Fill} from "react-icons/ri";
import {IoIosPeople} from "react-icons/io";
import {AiFillFileText} from "react-icons/ai";
import {FaChartBar,FaChartPie,FaChartLine,FaStopwatch,FaGamepad} from "react-icons/fa";
import {RiCoupon2Fill} from "react-icons/ri";
import {useState, useEffect} from "react";
import {HiMenuAlt4} from "react-icons/hi";


const AdminSidebar=()=>{
    const Location=useLocation();
    const[showModel,setShowModel]=useState<boolean>(false);
    const[phoneActive, setPhoneActive]= useState<boolean>( window.innerWidth<1100 );

    const resizeHandler=()=>{
        setPhoneActive(window.innerWidth<1100);
    }

    useEffect(()=>{
        window.addEventListener('resize',resizeHandler);
        return ()=> window.removeEventListener("resize",resizeHandler);
    },[]);

    return (
    <>{phoneActive && <button id="hamburger" onClick={()=>setShowModel(true)}><HiMenuAlt4 /></button>}
        <aside style={phoneActive?{
            width:"20rem",
            height:"100vh",
            position:"fixed",
            top:0,
            left:showModel?"0":"-20rem",
            transition:"all 0.5s",
            zIndex:150,
        }:{}}>
            <h2>Logo.</h2>
            <div>
                <h5>Dashboard</h5>
                <ul>
                    <Li text={"Dashboard"} url={"/admin/dashboard"} location={Location} Icon={MdDashboard} />
                    <Li text={"Product"} url={"/admin/product"} location={Location} Icon={RiShoppingBag3Fill} />
                    <Li text={"Customer"} url={"/admin/customer"} location={Location} Icon={IoIosPeople} />
                    <Li text={"Transaction"} url={"/admin/transaction"} location={Location} Icon={AiFillFileText} />
                </ul>
            </div>
            <div>
                <h5>Charts</h5>
                <ul>
                    <Li text={"Bar"} url={"/admin/chart/bar"} location={Location} Icon={FaChartBar} />
                    <Li text={"Pie"} url={"/admin/chart/pie"} location={Location} Icon={FaChartPie}  />
                    <Li text={"Line"} url={"/admin/chart/line"} location={Location} Icon={FaChartLine} />
                </ul>
            </div>
            <div>
                <h5>Apps</h5>
                <ul>
                    <Li text={"StopWatch"} url={"/admin/app/stopwatch"} location={Location} Icon={FaStopwatch} />
                    <Li text={"Coupon"} url={"/admin/app/coupon"} location={Location} Icon={RiCoupon2Fill} />
                    <Li text={"Toss"} url={"/admin/app/toss"} location={Location} Icon={FaGamepad} />
                </ul>
            </div>
            {phoneActive? <button id="close-sidebar" onClick={()=>setShowModel(false)}>Close</button>:null }
        </aside>
    </>
    )
}
interface LiType{
    url:string,
    text:string,
    location:Location,
    Icon:IconType,

}
const Li=({text,Icon,url,location}:LiType)=>{
    return <li style={{backgroundColor:location.pathname.includes(url)?"rgba(0,115,255,0.1)":"white"}} ><Link style={{color:location.pathname.includes(url)?"blue":"black"}} to={url}><Icon /> {text}</Link></li>
}
export default AdminSidebar;