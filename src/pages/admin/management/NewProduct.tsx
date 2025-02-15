import AdminSidebar from "../../../components/admin/AdminSidebar.tsx";
import {useState,ChangeEvent, FormEvent} from "react";
import { useNewProductMutation } from "../../../redux/api/productAPI.ts";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../types/reducer-types.ts";
import { useNavigate } from "react-router-dom";
import { responseToast } from "../../../utils/features.ts";
const NewProduct=()=>{
    const navigate = useNavigate();
    const {user} = useSelector((state:{userReducer:userReducerInitialState})=>state.userReducer);
    const [name,setName]=useState<string>("");
    const [price,setPrice]=useState<number>();
    const [stock,setStock]=useState<number>();
    const [photo,setPhoto]=useState<File>();
    const [photoPrev, setPhotoPrev] = useState<string>();
    const [category, setCategory] = useState<string>("");
    const [newProduct] = useNewProductMutation();
    const changeImageHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        const file:File | undefined = e.target.files?.[0];
        const reader:FileReader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
            reader.onload=()=>{
                if(typeof reader.result === "string" ) {
                    setPhoto(file);
                    setPhotoPrev(reader.result);
                };
            }
        }
    }

    const submitHandler = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!name || !price || !stock || !photo)
            return;
        const formData = new FormData();
        formData.set("name", name);
        formData.set("price", price.toString());
        formData.set("stock", stock.toString());
        formData.set("photo", photo);
        formData.set("category", category);

        const res = await newProduct({
            id:user?._id!,
            formData,
        });
        responseToast(res, navigate, "/admin/product");
    }   

    return(
        <div className="admin-container">
            <AdminSidebar />
            <main className="product-management">
                <article>
                    <form onSubmit={submitHandler}>
                        <h2>New Product</h2>
                        <div>
                            <label htmlFor="">Name</label>
                            <input type="text"  placeholder="Name" value={name}
                            onChange={(e)=>setName(e.target.value)}
                            required />
                        </div>
                        <div>
                            <label htmlFor="">Price</label>
                            <input type="number" required value={price} onChange={(e)=>setPrice(Number(e.target.value))} placeholder="Price" id="" />
                        </div>
                        <div>
                            <label htmlFor="">Stock</label>
                            <input type="number" required placeholder="Stock" value={stock} onChange={(e)=>setStock(Number(e.target.value))} id="" />
                        </div>
                        <div>
                            <label htmlFor="">Photo</label>
                            <input type="file" onChange={changeImageHandler} />
                        </div>
                        {
                            photoPrev && <img src={photoPrev} alt="New Image" />
                        }
                        <div>
                            <label htmlFor="">Category</label>
                            <input type="text" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
                        </div>
                        <button type="submit">Create</button>
                    </form>
                </article>
            </main>
        </div>
    );
};

export default NewProduct;