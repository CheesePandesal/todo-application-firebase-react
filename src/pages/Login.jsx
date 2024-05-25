import { Navigate } from "react-router-dom";
import googleLogo from "../assets/google-logo.svg";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { useEffect } from "react";
const cookies = new Cookies();
export default function Login({ setIsAuth }) {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      cookies.set("auth-token", result.user.refreshToken);
      cookies.set("name", result.user.displayName);
      cookies.set("profilePicture", result.user.photoURL);
      cookies.set("uid", result.user.uid);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#dae9d8] w-full h-screen flex justify-center items-center font-sans">
      <div className="bg-[#89b67f] h-screen min-w-[500px] max-w-[700px] text-white pt-12 relative flex justify-center items-center">
        <div className="text-center">
          <div className="mb-4">
            <h1 className="text-5xl font-bold">Todo.</h1>
          </div>
          <button
            className="p-4 bg-white text-black flex gap-4"
            onClick={signInWithGoogle}
          >
            <img src={googleLogo} alt="" width={20} height={20} />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
