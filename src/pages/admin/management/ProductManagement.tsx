import AdminSidebar from "../../../components/admin/AdminSidebar.tsx";
import {useState,ChangeEvent,FormEvent} from "react";


const img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRugxnJy9YzBfKpQgJnPb2uQw1xG59oGkEFPuq5743Hn3kj8CvY1ARt6vhHEnwybOKgFWberA&s";

const ProductManagement=()=>{
    const [name,setName]=useState<string>("puma mouse");
    const [price,setPrice]=useState<number>(200);
    const [stock,setStock]=useState<number>(10);
    const [photo,setPhoto]=useState<string>(img);

    const [nameUpdate,setNameUpdate]=useState<string>(name);
    const [priceUpdate,setPriceUpdate]=useState<number>(price);
    const [stockUpdate,setStockUpdate]=useState<number>(stock);
    const [photoUpdate,setPhotoUpdate]=useState<string>(photo);

    const changeImageHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        const file:File | undefined = e.target.files?.[0];
        const reader:FileReader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
            reader.onload=()=>{
                if(typeof reader.result === "string" ) setPhotoUpdate(reader.result);
            }
        }
    }
    
    const submitHandler=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setName(nameUpdate);
        setPrice(priceUpdate);
        setStock(stockUpdate);
        setPhoto(photoUpdate);
        

    }

    return(
        <div className="admin-container">
            <AdminSidebar />
            <main className="product-management">
                <section>
                    <strong>ID -- fdasjkfsklj34rf</strong>
                    <img src={photo} alt="Product" />
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
                            <label htmlFor="">Photo</label>
                            <input type="file" onChange={changeImageHandler} name="" id="" />
                        </div>
                        {
                            photoUpdate && <img src={photoUpdate} alt="New Image" />
                        }
                        <button type="submit">Update</button>
                    </form>
                </article>
            </main>
        </div>
    );
};

export default ProductManagement;