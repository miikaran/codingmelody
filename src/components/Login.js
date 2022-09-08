import React from 'react';
import { useState, useEffect} from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.js'
import { useNavigate } from 'react-router-dom'


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
        <div className="flex justify-center py-60">
            <div className="text-3xl mx-4 mt-6 font-bold"><h1>Login page</h1></div>
            <div className="bg-gray-500 p-5">
                <div className="space-x-5">
                    <input onChange={handleEmailChange} value={email} placeholder="email here" type="email" />
                    <input onChange={handlePasswordChange} value={password} placeholder="password here" type="password" />
                    <button onClick={handleSignIn} className="bg-gray-800 p-2 text-2xl text-white">Log in</button>
                    <a href="/Signup" className="text-2xl text-white bg-gray-800 p-2">Signup</a>
                </div>
            </div>
        </div>
    )
}