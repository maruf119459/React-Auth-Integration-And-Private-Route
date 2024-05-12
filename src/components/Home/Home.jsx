import { useContext, useEffect } from "react";
import { AuthProviderContext } from "../../Context/AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const {user} = useContext(AuthProviderContext)
    const navigate  = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/login')
            return   
        }
    })
        
    
    return (
        <div>
            <h1 className="text-center text-3xl font-semibold mt-12">{user?.displayName}, Welcome to Our Website</h1>
        </div>
    );
};

export default Home;