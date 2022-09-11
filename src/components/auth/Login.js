import React from 'react';
import { useState, useEffect} from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase.js'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/Untitled (2).svg'
import { Link } from 'react-router-dom';
import LoginImg from '../../assets/LoginImg.svg'


export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    /*PREVENT USER FROM LOGGIN
     OUT IF REFRESHING ETC*/
    useEffect(() =>{
        auth.onAuthStateChanged((user) => {
            if(user){
                navigate('/MainPage')
            }
        });
    }, [])

    const handleEmailChange = (event) => {       
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {       
        setPassword(event.target.value);
    }

    const handleSignIn = () => {

        /*SIGN IN & REDIRECT USER TO 
        MAINPAGE IF CORRECT CREDENTIALS*/
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate('/MainPage')
        })
        .catch((err) => {
            alert(err.message)
        });
    }

    return(
        <div className="flex justify-center mr-32 mt-32">
            <div className="bg-sky-200 bg-opacity-90 space-y-7 sm:px-20 py-20">
            <img className="max-w-sm" src={Logo} alt="logo" /> 
                <div className="space-y-6 flex flex-col">
                    <input className="px-4 rounded-sm py-3" onChange={handleEmailChange} value={email} placeholder="Enter Email.." type="email" />
                    <input className="px-4 rounded-sm py-3"  onChange={handlePasswordChange} value={password} placeholder="Enter Password" type="password" />
                    <button onClick={handleSignIn} className="bg-indigo-500 p-2 px-24 text-2xl rounded-sm text-white font-bold hover:bg-indigo-600 transition duration-200">LOG IN</button>   
                </div>
                
                <div className="flex justify-center text-center mt-4">
                    <span className="text-gray-700 font-bold">No Account Yet? <br />Create New Account <Link to="/Signup" className="underline text-rose-500" href="">Here.</Link></span>
                </div>                 
            </div>
            <img className="px-14 max-w-md bg-sky-200 bg-opacity-80" src={LoginImg} alt="Login" />
        </div>
    )
}