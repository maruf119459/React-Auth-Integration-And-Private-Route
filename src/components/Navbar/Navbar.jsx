import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthProviderContext } from "../../Context/AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const {user,logOut,setSignOutErrorMessage,setSignOutSuccessMessage} = useContext(AuthProviderContext)
    const navLinks = <>
        {user && <NavLink to="/"><li className="btn mx-3">Home</li></NavLink>}
        {!user && <NavLink to="/login"><li className="btn mx-3">Login</li></NavLink>}
        {!user && <NavLink to="/registration"><li className="btn mx-3">Registration</li></NavLink>}
        {user && <NavLink to="/profile"><li className="btn mx-3">Profile</li></NavLink>}
    </>;
    const navigate  = useNavigate();            
    const handleLogout = () =>{
        logOut().then(()=>{
            setSignOutSuccessMessage('You SignOut');
            console.log('Sing Out')
            navigate('/login');
        })
        .catch((error)=>{
            setSignOutErrorMessage(error.message);
            console.log(error.message)
        })
    }
    return (
        <div className="mx-[100px]">
            <div className="navbar bg-slate-400	 rounded-lg">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ">
                            {
                                navLinks
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 ">
                        {
                            navLinks
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                {user && <button onClick={handleLogout} className="btn">Log Out</button>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;