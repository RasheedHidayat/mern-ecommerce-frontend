import AdminSidebar from "../../components/AdminSidebar.tsx";
import {useState,ChangeEvent} from "react";
const NewProduct=()=>{
    const [name,setName]=useState<string>("");
    const [price,setPrice]=useState<number>();
    const [stock,setStock]=useState<number>();
    const [photo,setPhoto]=useState<string>();

    const changeImageHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        const file:File | undefined = e.target.files?.[0];
        const reader:FileReader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
            reader.onload=()=>{
                if(typeof reader.result === "string" ) setPhoto(reader.result);
            }
        }
    }
    return(
        <div className="admin-container">
            <AdminSidebar />
            <main className="product-management">
                <article>
                    <form>
                        <h2>New Product</h2>
                        <div>
                            <label htmlFor="">Name</label>
                            <input type="text" name="" placeholder="Name" value={name}
                            onChange={(e)=>setName(e.target.value)}
                            id="" />
                        </div>
                        <div>
                            <label htmlFor="">Price</label>
                            <input type="number" name="" value={price} onChange={(e)=>setPrice(Number(e.target.value))} placeholder="Price" id="" />
                        </div>
                        <div>
                            <label htmlFor="">Stock</label>
                            <input type="number" name="" placeholder="Stock" value={stock} onChange={(e)=>setStock(Number(e.target.value))} id="" />
                        </div>
                        <div>
                            <label htmlFor="">Photo</label>
                            <input type="file" onChange={changeImageHandler} name="" id="" />
                        </div>
                        {
                            photo && <img src={photo} alt="New Image" />
                        }
                        <button type="submit">Create</button>
                    </form>
                </article>
            </main>
        </div>
    );
};

export default NewProduct;