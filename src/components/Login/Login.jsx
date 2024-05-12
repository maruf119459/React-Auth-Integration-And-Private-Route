import { Link } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useContext, useState,useRef } from "react";
import { AuthProviderContext } from "../../Context/AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const { setPassword,setUser,singWithEmailPassword,setLoginErrorMessage,setLoginSuccessMessage,singWithGoogle,singWithFacbbok,forgotPassword} = useContext(AuthProviderContext)
    const [showPassword, setShowPassword] = useState(false)
    const emailRef = useRef(null);

    const navigate  = useNavigate();

    const handleLogin = e =>{
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        setPassword(password);
        singWithEmailPassword(email,password).then((result)=>{
            setLoginSuccessMessage('Welcome '+result.user.displayName)
            console.log(result.user)
            setUser(result.user)
            navigate('/');
        })
        .catch((error) =>{
            setLoginErrorMessage(error.message)
        })
    }

    const handleGoogleLogin = () =>{
        singWithGoogle().then(result =>{
            setUser(result.user)
            setLoginSuccessMessage('Welcome ')
            console.log(result.user)
        }) 
        .catch((error) =>{
            setLoginErrorMessage(error.message)
        })
    }

    const handleFacbookLogin = () =>{
        singWithFacbbok().then(result =>{
            setUser(result.user)
            setLoginSuccessMessage('Welcome ')
            console.log(result.user)
        })
        .catch((error) =>{
            setLoginErrorMessage(error.message)
        })
    }
    
    const handleForgotPassword = () =>{
        const email = emailRef.current.value;
        forgotPassword(email).then(() =>{
            setLoginSuccessMessage('Password Reset Mail Sent.')
            console.log('Password Reset Mail Sent.')
        })
        .catch(error =>{
            setLoginErrorMessage(error.message)
        })
    }

    return (
        <div>
            <div className="flex justify-center">
                <div className=" w-[500px] flex-col lg:flex-row-reverse mt-20">
                    <div className=" shadow-2xl bg-base-100 rounded-lg pb-4">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" ref={emailRef} name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="w-full input input-bordered" required />
                                    <span className="absolute right-3 top-4" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <IoEye /> : <IoMdEyeOff />}</span>
                                </div>                                <label className="label">
                                    <p onClick={handleForgotPassword} className="label-text-alt link link-hover">Forgot password?</p>
                                </label>
                            </div>
                            <div className="form-control mt-4">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <label className="flex flex-col gap-y-2 ms-6">
                            <p>If Have No Account. Please <Link to="/registration"><span className=" link link-hover">Register</span></Link> or</p>
                            <p>Login With <span onClick={handleGoogleLogin} className=" link link-hover">Google</span> or <span onClick={handleFacbookLogin} className=" link link-hover">Facbook</span>.</p>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;