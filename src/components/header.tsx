import {Link} from "react-router-dom";
import {FaSearch,FaShoppingBag, FaSignInAlt,FaUser, FaSignOutAlt} from "react-icons/fa";
import {useState} from "react";

const user={_id:"fd",role:""};

const Header=()=>{
    const [open,setOpen]=useState<boolean>(false);


    const logoutHandler=()=>{
        setOpen(false);
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