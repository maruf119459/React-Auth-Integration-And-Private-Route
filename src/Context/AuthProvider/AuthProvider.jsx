import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut,signInWithPopup,sendPasswordResetEmail } from "firebase/auth";
import auth from "../../firebase.init";
import { GoogleAuthProvider } from "firebase/auth";
const googleProvider = new GoogleAuthProvider();

import { FacebookAuthProvider } from "firebase/auth";
const facbookProvider = new FacebookAuthProvider();




export const AuthProviderContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const [registrationSuccessMessage, setRegistrationSuccessMessage] = useState('');
    const [registrationErrorMessage,setRegistrationErrorMessage] =  useState('');
    const [password, setPassword] = useState(null);

   
    const [loginSuccessMessage, setLoginSuccessMessage] = useState('');
    const [loginErrorMessage,setLoginErrorMessage] =  useState('');

    const [signOutSuccessMessage, setSignOutSuccessMessage] = useState('');
    const [signOutErrorMessage, setSignOutErrorMessage] = useState('');



    const createUserByEmailPassword = (email, password) => {
        setLoading(true);

        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singWithEmailPassword = (email, password) => {
        setLoading(true);

        return signInWithEmailAndPassword(auth, email, password)
    }

    const singWithGoogle = () =>{
        setLoading(true);

        return signInWithPopup(auth, googleProvider)
    }

    const singWithFacbbok = () =>{
        setLoading(true);

        return signInWithPopup(auth, facbookProvider)
    }

    const forgotPassword = (email) =>{
        setLoading(true);

        return sendPasswordResetEmail(auth, email);
    }

    const logOut = () =>{
        setLoading(true);

        return signOut(auth)
    }
    

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setLoading(false);
            setUser(currentUser);
            console.log('current'+currentUser)
        })

        return () =>{
            unSubscribe();
        }
    })
 

   


    const AuthValue = { createUserByEmailPassword, setUser, user, singWithEmailPassword,setRegistrationSuccessMessage, setRegistrationErrorMessage,
        registrationErrorMessage, registrationSuccessMessage,setLoginSuccessMessage,setLoginErrorMessage,loginSuccessMessage,loginErrorMessage, logOut,
        signOutSuccessMessage, setSignOutSuccessMessage,signOutErrorMessage, setSignOutErrorMessage,singWithGoogle,singWithFacbbok,forgotPassword,setLoading,loading,
        password, setPassword
     };
    return (
        <AuthProviderContext.Provider value={AuthValue}>
            {
                children
            }
        </AuthProviderContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node,
}
