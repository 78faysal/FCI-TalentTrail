import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";


const GoogleSignIn = () => {
    const {googleSignIn} = useAuth();
    // console.log(googleSignIn);
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(res => {
            console.log(res.user);
        })
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn w-full text-lg">Continue with <FcGoogle className="text-2xl" /></button>
        </div>
    );
};

export default GoogleSignIn;