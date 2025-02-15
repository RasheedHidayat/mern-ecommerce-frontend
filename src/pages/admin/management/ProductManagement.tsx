import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar.tsx";
import {useState,ChangeEvent,FormEvent, useEffect} from "react";
import { userReducerInitialState } from "../../../types/reducer-types.ts";
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from "../../../redux/api/productAPI.ts";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { server } from "../../../redux/store.ts";
import { FaTrash } from "react-icons/fa";
import { SkeletonLoader } from "../../../components/loader.tsx";
import { responseToast } from "../../../utils/features.ts";



const ProductManagement=()=>{
    const {user} = useSelector((state:{userReducer:userReducerInitialState})=>state.userReducer)
    const params = useParams();
    const {data, isLoading ,refetch, isError} = useProductDetailsQuery(params.id!);
    const navigate = useNavigate();

    const {name, price, stock, photo, category,  } = data?.product || {
      
        name:"",
        price:0,
        stock:0,
        photo:"",
        category:"",
    };



    const [nameUpdate,setNameUpdate]=useState<string>(name);
    const [priceUpdate,setPriceUpdate]=useState<number>(price);
    const [stockUpdate,setStockUpdate]=useState<number>(stock);
    const [photoUpdate,setPhotoUpdate]=useState<string>("");
    const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
    const [photoFile, setPhotoFile] = useState<File>();

    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const changeImageHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        const file:File | undefined = e.target.files?.[0];
        const reader:FileReader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
            reader.onload=()=>{
                if(typeof reader.result === "string" ){
                     setPhotoUpdate(reader.result);
                     setPhotoFile(file);
                    };
            }
        }
    }
    
    const submitHandler=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData();
        if(nameUpdate) formData.set("name", nameUpdate);
        if(priceUpdate) formData.set("price", priceUpdate.toString());
        if(stockUpdate!==undefined) formData.set("stock", stockUpdate.toString());
        if(categoryUpdate) formData.set("category", categoryUpdate);
        if(photoFile) formData.set("photo", photoFile);
        let res =await updateProduct({
            userId:user?._id!,
            productId: data?.product._id!,
            formData,
        });
        responseToast(res, navigate, "/admin/product")
        refetch();
    }

    const deleteHandler = async()=>{
       let res=  await deleteProduct({
            userId: user?._id!,
            productId: data?.product._id!,
        });
        responseToast(res, navigate, "/admin/product");

    }

    

    useEffect(()=>{
        if(data ){
            setNameUpdate(data.product.name);
            setPriceUpdate(data.product.price);
            setStockUpdate(data.product.stock);
            setCategoryUpdate(data.product.category);
        }
    },[data]);
    if(isError) return <Navigate to={"/404"} />
    return(
        <div className="admin-container">
            <AdminSidebar />
            <main className="product-management">
                {
                    isLoading? <SkeletonLoader /> :
                    <>
                    
                <section>
                    <strong>ID -- {data?.product._id!}</strong>
                    <img src={`${server}/${photo}`} alt={name} />
                    <p>{name}</p>
                    {
                        stock>0? <span className="green">{stock} Available</span>: <span className="red">Not Available</span>
                    }
                    <h3>${price}</h3>
                </section>
                <article>
                    <form onSubmit={submitHandler}>
                        <h2>Manage</h2>
                        <div>
                            <label htmlFor="">Name</label>
                            <input type="text" name="" placeholder="Name" value={nameUpdate}
                            onChange={(e)=>setNameUpdate(e.target.value)}
                            id="" />
                        </div>
                        <div>
                            <label htmlFor="">Price</label>
                            <input type="number" name="" value={priceUpdate} onChange={(e)=>setPriceUpdate(Number(e.target.value))} placeholder="Price" id="" />
                        </div>
                        <div>
                            <label htmlFor="">Stock</label>
                            <input type="number" name="" placeholder="Stock" value={stockUpdate} onChange={(e)=>setStockUpdate(Number(e.target.value))} id="" />
                        </div>
                        <div>
                            <label htmlFor="">Category</label>
                            <input type="text" value={categoryUpdate} onChange={e=>setCategoryUpdate(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">Photo</label>
                            <input type="file" onChange={changeImageHandler} name="" id="" />
                        </div>
                        {
                            photoUpdate && <img src={photoUpdate} alt="New Image" />
                        }
                        <button type="submit">Update</button>
                    </form>
                    <span onClick={deleteHandler}  className="del-product">
                        <FaTrash />
                    </span>
                 </article>
                </>
                }
            </main>
        </div>
    );
};

export default ProductManagement;