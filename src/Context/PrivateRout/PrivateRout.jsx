import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { AuthProviderContext } from "../AuthProvider/AuthProvider";


const PrivateRout = ({ children }) => {
    const {user,loading} = useContext(AuthProviderContext);
    console.log('private path',user)

    if(loading){
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if (user) {
        console.log('private path child')
        return children;
    }
    return <Navigate to="/login"></Navigate>;
    
};




export const PrivateRout2 = ({ children }) => {
    const { user } = useContext(AuthProviderContext)

    if (!user) {
        return children;
    }
    return <Navigate to="/"></Navigate>;
};

PrivateRout2.propTypes = {
    children: PropTypes.node,
}

export default PrivateRout;
PrivateRout.propTypes = {
    children: PropTypes.node,
}