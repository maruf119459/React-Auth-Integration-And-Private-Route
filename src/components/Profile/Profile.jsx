import { useContext, useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { AuthProviderContext } from "../../Context/AuthProvider/AuthProvider";
import { getAuth, updateProfile, updatePassword } from "firebase/auth";

const Profile = () => {
    const auth = getAuth();
    const { user, password } = useContext(AuthProviderContext);
    const [showPassword, setShowPassword] = useState(false);



    const handleProfileUpdate = e => {
        e.preventDefault();
        let name = e.target.name.value || user.displayName;
        let photo = e.target.photo.value || user.photoURL;
        let newPassword = e.target.passcode.value;

        if (newPassword) {
            updatePassword(user, newPassword)
                .then(() => {
                    console.log('Password updated');
                })
                .catch(error => {
                    console.log(error.message);
                });
        }

        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
            .then(() => {
                console.log('Profile updated');
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    return (
        <div>
            <div className="flex justify-center justify-around mt-16">
                <div className=" w-[500px] flex-col lg:flex-row-reverse ">
                    <div className=" shadow-2xl bg-base-100 rounded-lg pb-4">
                        <p className="text-2xl text-center font-bold pt-5">Your Information</p>
                        <div className="mx-12 pt-5">
                            <div className="flex justify-center">
                                <img src={user?.photoURL} alt="" className="w-[200px] h-[200px] rounded-full mb-7 " />
                            </div>
                            <div>
                                <p className="text-lg font-semibold mb-2">Name: <span>{user?.displayName}</span></p>
                                <p className="text-lg font-semibold">Email: <span>{user?.email}</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" w-[500px] flex-col lg:flex-row-reverse">
                    <div className=" shadow-2xl bg-base-100 rounded-lg pb-4">
                        <p className="text-center text-2xl font-bold pt-5">Update Your Information</p>
                        <form onSubmit={handleProfileUpdate} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image</span>
                                </label>
                                <input type="text" name="photo" placeholder="Image Link" className="input input-bordered" />
                            </div>
                            {password && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} name="passcode" placeholder="Password" className="w-full input input-bordered" />
                                        <span className="absolute right-3 top-4" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <IoEye /> : <IoMdEyeOff />}</span>
                                    </div>
                                </div>
                            )}
                            <div className="form-control mt-4">
                                <button className="btn btn-primary">Update Information</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
