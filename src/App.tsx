import {BrowserRouter as Router , Routes,Route,Link} from "react-router-dom";
import {lazy,Suspense} from "react";
import Loader from "./components/Loader.tsx";
//import pages using lazy() to reduce load of website
const Dashboard =lazy(()=> import("./pages/dashboard.tsx"));
const Customer=lazy(()=>import("./pages/customer.tsx"));
const Product=lazy(()=>import("./pages/product.tsx"));
const Transaction=lazy(()=>import("./pages/transaction.tsx"));
//import chart pages and reduce load using lazy()
const BarCharts=lazy(()=>import("./pages/Charts/BarCharts.tsx"));
const PieCharts =lazy(()=>import("./pages/Charts/PieCharts.tsx"));
const LineCharts=lazy(()=>import("./pages/Charts/LineCharts.tsx"));
//import apps pages and also reduce load page using lazy()
const Stopwatch=lazy(()=>import("./pages/Apps/Stopwatch.tsx"));
const Coupon=lazy(()=>import("./pages/Apps/Coupon.tsx"));
const Toss=lazy(()=>import("./pages/Apps/Toss.tsx"));
// import management pages by using lazy()
const NewProduct= lazy(()=>import("./pages/management/NewProduct.tsx"));
const ProductManagement=lazy(()=>import("./pages/management/ProductManagement.tsx"));
const TransactionManagement = lazy(()=>import("./pages/management/TransactionManagement.tsx"));


const App=()=>{
  return (

    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Home page */}
          <Route path={"/"} element={<Link to="/admin/dashboard"> <button>Visit Dashboard</button> </Link>} />
          {/* Dashboard */}
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
        </Routes>
      </ Suspense>
    </Router>
  )
}

export default App;