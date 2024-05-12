import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { AuthProviderContext } from "../../Context/AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification,signInWithEmailAndPassword,signOut } from "firebase/auth";


const Registration = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { createUserByEmailPassword,setRegistrationSuccessMessage,setRegistrationErrorMessage } = useContext(AuthProviderContext)
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate  = useNavigate();
  
    
    
    const handelVerification = e => {
        e.preventDefault()
        const email = e.target.email.value;
        setEmail(email);
        const password = e.target.password.value;
        setPassword(password);
        console.log(email, password)
        createUserByEmailPassword(email, password).then((result)=>{
            console.log(result.user)
            sendEmailVerification(result.user).then(() =>{
                setRegistrationSuccessMessage('Verification Mail Sent.')
                console.log('Verification Mail Sent')
            })
            .catch(error =>{
                setRegistrationErrorMessage(error.message);
            })
        })
        
    }

    const handelRegistration = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then(result =>{
            if(!result.user.emailVerified){
                setRegistrationErrorMessage('Please Check Your Mail. And Verify Your Account.')
                console.log('error')
                return;
            }
            updateProfile(result.user, {
                displayName: name, 
            }).then(() => {
                setRegistrationSuccessMessage('Your Registration Complete.')
                console.log('Your Registration Complete.')
                console.log(result.user)
                navigate('/login')
            })
            .catch(error =>{
                setRegistrationErrorMessage(error.message)
            })
        })
        signOut(auth);
    }

    return (
        <div className="">
            <div className="flex justify-center items-center pt-12 ">
                <div className=" w-[500px] shadow-2xl bg-base-100 rounded-lg px-6 py-4 flex flex-col justify-cneter items-center">
                    <div className="w-[400px]">
                        {
                            // registrationSuccessMessage && <p className="text-center font-semibold text-green-500 mb-2">{registrationSuccessMessage}</p>
                        }
                        {
                            // registrationFailMessage && <p className="text-center font-semibold text-red-500 mb-2">{registrationFailMessage}</p>
                        }
                    </div>
                    <div>
                        <form onSubmit={handelVerification} className="border border-2 p-2 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="gorw">
                                    <div className="form-control w-full ">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" name="email" placeholder="email" className="w-[355px] input input-bordered" required />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Create Password</span>
                                        </label>
                                        <div className="relative">
                                            <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="w-full input input-bordered" required />
                                            <span className="absolute right-3 top-4" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <IoEye /> : <IoMdEyeOff />}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Verify</button>
                                </div>
                            </div>
                        </form>
                        <form onSubmit={handelRegistration} className="">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Registration</button>
                            </div>
                        </form>
                        <label className="label  mb-2">
                            <Link to="/login">If You Have an Account Please <span className=" link link-hover">Login</span></Link>
                        </label>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Registration;