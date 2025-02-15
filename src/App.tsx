import {BrowserRouter as Router , Routes,Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {lazy,Suspense, useEffect} from "react";
import Loading from "./components/admin/Loader.tsx";
import Loader from "./components/loader.tsx";
import Header from "./components/header.tsx";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase.ts";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer.ts";
import { getUser } from "./redux/api/userAPI.ts";
import { userReducerInitialState } from "./types/reducer-types.ts";
import ProtectedRoute from "./components/protected-route.tsx";
//import main pages of website use also lazy()
const Home = lazy(()=>import("./pages/home.tsx"));
const Search = lazy(()=>import("./pages/search.tsx"));
const Cart = lazy(()=>import("./pages/cart.tsx"));
const Shipping = lazy(()=>import("./pages/shipping.tsx"));
const Login = lazy(()=>import("./pages/login.tsx"));
const Orders= lazy(()=>import("./pages/orders.tsx"));
const OrderDetails = lazy(()=>import("./pages/order-details.tsx"));;
const NotFound = lazy(()=>import("./pages/not-found.tsx"));
const Checkout = lazy(()=>import("./pages/checkout.tsx"));
//import pages using lazy() to reduce load of website
const Dashboard =lazy(()=> import("./pages/admin/dashboard.tsx"));
const Customer=lazy(()=>import("./pages/admin/customer.tsx"));
const Product=lazy(()=>import("./pages/admin/product.tsx"));
const Transaction=lazy(()=>import("./pages/admin/transaction.tsx"));
//import chart pages and reduce load using lazy()
const BarCharts=lazy(()=>import("./pages/admin/Charts/BarCharts.tsx"));
const PieCharts =lazy(()=>import("./pages/admin/Charts/PieCharts.tsx"));
const LineCharts=lazy(()=>import("./pages/admin/Charts/LineCharts.tsx"));
//import apps pages and also reduce load page using lazy()
const Stopwatch=lazy(()=>import("./pages/admin/Apps/Stopwatch.tsx"));
const Coupon=lazy(()=>import("./pages/admin/Apps/Coupon.tsx"));
const Toss=lazy(()=>import("./pages/admin/Apps/Toss.tsx"));
// import management pages by using lazy()
const NewProduct= lazy(()=>import("./pages/admin/management/NewProduct.tsx"));
const ProductManagement=lazy(()=>import("./pages/admin/management/ProductManagement.tsx"));
const TransactionManagement = lazy(()=>import("./pages/admin/management/TransactionManagement.tsx"));


const App=()=>{
  const {user, loading} = useSelector((state:{userReducer:userReducerInitialState})=>state.userReducer)
  const dispatch = useDispatch();

  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{

     try{
      if(user){
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));

      }else dispatch(userNotExist())
     }catch(err){
      console.log("error exist or not");
      console.log(err);
     }
    })
  },[auth]);

  return (loading?<Loader/>: (

    <Router>
      {/* Header */}
      <Header user={user} />
      <Suspense fallback={<Loading />}>
        <Routes>
        {/* USER SIDE ROUTES*/}
          <Route path={"/"} element={<Home />} />
          <Route path={"/search"} element={<Search />} />
          <Route path={"/cart"} element={<Cart />} />
          {/*Not logged in route */}
          <Route path={"/login"} element={ <ProtectedRoute isAuthenticated={user ? false : true} >
            <Login />
          </ProtectedRoute> } />
          {/* Login User Side Routes */}
          <Route element={<ProtectedRoute isAuthenticated={user ? true : false}/>}>
                 <Route path={"/shipping"} element={<Shipping />} />
                 <Route path={"/orders"} element={<Orders />} />
                 <Route path={"/order/:id"} element={<OrderDetails />} />
                 <Route path={"/pay"} element={<Checkout/>} />
          </Route>
        {/*--------ADMIN ROUTES-------- */}
          {/* Dashboard */}
          <Route element={<ProtectedRoute isAuthenticated={true} adminOnly={true} admin={(user?.role=="admin")?true:false} />}>
              <Route path={"/admin/dashboard"} element={<Dashboard />} />
              <Route path={"/admin/product"} element={<Product />} />
              <Route path={"/admin/customer"} element={<Customer />} />
              <Route path={"/admin/transaction"} element={<Transaction />} />
              {/* Charts */}
              <Route path={"/admin/chart/bar"} element={<BarCharts />} />
              <Route path={"/admin/chart/pie"} element={<PieCharts />} />
              <Route path={"/admin/chart/line"} element={<LineCharts />} />
              {/* Apps */}
              <Route path={"/admin/app/stopwatch"} element={<Stopwatch />} />
              <Route path={"/admin/app/coupon"} element={<Coupon />} />
              <Route path={"/admin/app/toss"} element={<Toss />} />
              {/* Managements */}
              <Route path={"/admin/product/new"} element={<NewProduct />} />
              <Route path={"/admin/product/:id"} element={<ProductManagement />} />
              <Route path={"/admin/transaction/:id"} element={<TransactionManagement /> } />
          </Route>
          <Route path={"*"} element={<NotFound/>} />
        </Routes>
      </ Suspense>
      <Toaster position="bottom-center" />
    </Router>
  ))
}

export default App;