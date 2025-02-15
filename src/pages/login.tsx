import {  GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [gender, setGender] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [login] = useLoginMutation();


  const loginHandler = async () => {
    try{
        const provider = new GoogleAuthProvider();
        let {user}= await signInWithPopup(auth, provider); // Redirects user to Google sign-in
        let res = await login({
            name:user.displayName as string,
            email:user.email!,
            _id:user.uid,
            role:"user",
            photo:user.photoURL as string,
            gender,
            dob:date,

        })
        if("data" in res){
            toast.success(res.data?.message!);
        }else{
            toast.error("Invalid Credential");
        }
    }
    catch(err:any){
        toast.error(err);
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>
        <div>
          <label>Gender</label>
          <select name="" id="" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <p>Already Signed In Once?</p>
          <button onClick={loginHandler}>
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
