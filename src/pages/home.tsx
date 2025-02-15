import {Link} from "react-router-dom";
import ProductCard from "../components/product-card.tsx";
import { useLatestProductsQuery } from "../redux/api/productAPI.ts";
import toast from "react-hot-toast";
import  { SkeletonLoader } from "../components/loader.tsx";
import { CartItem } from "../types/types.ts";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer.ts";


export const img="data:image/jpeg;base64,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";

const Home =()=>{
    const dispatch = useDispatch();
    const {data, isLoading, isError} = useLatestProductsQuery("");

    if(isError)toast.error("Cannot Fetch the Products");
    const addToCartHandler=(cartItem:CartItem)=>{
        if(cartItem.stock < 1) return toast.error("Out of Stock");
        dispatch(addToCart(cartItem));
        toast.success("Added To Cart");

    };

    return(
        <div className="home">
            <section></section>
            <h1>
                Latest Products
                <Link to={"/search"} className="find-more">More</Link>
            </h1>
            <main>
                {
                    isLoading?<SkeletonLoader width={"80vh"} />:data?.products.map((p)=>(
                        <ProductCard name={p.name} photo={p.photo} price={p.price} productId={p._id} stock={p.stock}
                        handler={addToCartHandler}  key={p._id}  />
                    ))
                }
            </main>
        </div>
    )
}
export default Home;