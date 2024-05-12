import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const Root = () => {
    return (
        <div className="min-h-screen bg-gray-200"> 
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Root;