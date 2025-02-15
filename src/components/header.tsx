import {Link} from "react-router-dom";
import {FaSearch,FaShoppingBag, FaSignInAlt,FaUser, FaSignOutAlt} from "react-icons/fa";
import {useState} from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
    user:User | null,

};

const Header=({user}:PropsType)=>{
    const [open,setOpen]=useState<boolean>(false);
    console.log(user);

    const logoutHandler=async()=>{
        try{
            await signOut(auth);
            toast.success("Sign out Successfully");
            setOpen(false);
        }catch(err){
            toast.error("Sign out Fail"); 
        }
    }

    return(
        <nav className="header">
            <Link to={"/"} onClick={()=>setOpen(false)}>HOME</Link>
            <Link to={"/search"} onClick={()=>setOpen(false)}>
                <FaSearch />
            </Link>
            <Link to={"/cart"} onClick={()=>setOpen(false)}>
                <FaShoppingBag />
            </Link>
            {
                user?._id? <>
                    <button onClick={()=>setOpen(prev=>!prev)}><FaUser /></button>
                    <dialog open={open}>
                        <div>
                            {
                                
                                user.role=="admin" && 
                                <Link to={"/admin/dashboard"} onClick={()=>setOpen(false)}>Admin</Link>
                            }
                            <Link to={"/orders"} onClick={()=>setOpen(false)}>Orders</Link>
                            <button onClick={logoutHandler}><FaSignOutAlt /></button>
                        </div>
                    </dialog>
                </>
                : (
                    <Link to={"/login"}><FaSignInAlt /></Link>
                )
            }
        </nav>
    )
}
export default Header;