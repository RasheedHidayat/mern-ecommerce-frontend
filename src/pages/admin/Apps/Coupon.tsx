import AdminSidebar from "../../../components/admin/AdminSidebar.tsx";
import {useState, FormEvent,useEffect} from "react";


const allLetters="ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghjklmnopqrstuvwxyz";
const allNumbers="0123456789";
const allSymbols="!@#$%^&*()_+";


const Coupon=()=>{
    
    const [size,setSize]=useState<number>(8);
    const [prefix,setPrefix]=useState<string>("");
    const [includeNumbers,setIncludeNumbers]=useState<boolean>(false);
    const [includeCharacters,setIncludeCharacters]=useState<boolean>(false);
    const [includeSymbols, setIncludeSymbols]= useState<boolean>(false);
    const [isCopied, setIsCopied]= useState<boolean>(false);

    const [coupon,setCoupon]=useState<string>("");

    const copyText=async (coupn:string)=>{
        await window.navigator.clipboard.writeText(coupn);
        setIsCopied(true);
    }

    const submitHandler=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!includeCharacters && !includeNumbers && !includeSymbols)
            return alert("Please Select one at least")
        let result:string=prefix||"";
        const loopLength:number = size - result.length;
        
        for(let i=0;i<=loopLength;i++){

            let entireString:String="";
            if (includeCharacters) entireString += allLetters;
            if(includeNumbers) entireString += allNumbers;
            if(includeSymbols) entireString +=allSymbols;

            const randomNum:number = Math.floor(Math.random()*entireString.length);

            result+=entireString[randomNum];


        }
        setCoupon(result);

    }

    useEffect(()=>{
        setIsCopied(false);
    },[coupon])

    return(
        <div className="admin-container">
            <AdminSidebar />
            <main className="dashboard-app-container">
                <h1>Coupon</h1>
                <section>
                    <form className="coupon-form" onSubmit={submitHandler}>
                        <input type="text" placeholder="Text to include" value={prefix} maxLength={size} onChange={(e)=>setPrefix(e.target.value)} />
                        <input type="number" placeholder="Coupon Length" value={size} min={8} max={25} onChange={(e)=>setSize(Number(e.target.value))} />
                        <fieldset>
                            <legend>Include</legend>
                            <input type="checkbox" checked={includeNumbers} onChange={()=>setIncludeNumbers(prev=>!prev)} />
                            <span>Numbers</span>
                            <input type="checkbox" checked={includeCharacters} onChange={()=>setIncludeCharacters(prev=>!prev)} />
                            <span>Characters</span>
                            <input type="checkbox" checked={includeSymbols} onChange={()=>setIncludeSymbols(prev=>!prev)} />
                            <span>Symbols</span>
                        </fieldset>
                        <button type="submit">Generate</button>
                    </form>
                    {coupon && <code>{coupon} <span onClick={()=>copyText(coupon)}>{isCopied?"Copied":"Copy"}</span></code> }
                </section>
            </main>
        </div>
    )
}
export default Coupon;