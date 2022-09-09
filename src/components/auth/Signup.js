import React from 'react';
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.js'
import { useNavigate } from 'react-router-dom'

export default function Signup(){

    const navigate = useNavigate();
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        checkEmail: '',
        password: '',
        checkPassword: ''
    });

    const handleSignUp = () => {

        /* ALERT IF INPUT FIELDS
          ARE NOT THE SAME */
        if(userCredentials.email !== userCredentials.checkEmail && userCredentials.password !== userCredentials.checkPassword){
            alert('Credentials are not the same.')
            return
        }
        else if(userCredentials.email !== userCredentials.checkEmail){
            alert('Emails are not the same.')
            return
        }
        else if(userCredentials.password !== userCredentials.checkPassword){
            alert('Passwords are not the same.')
            return
        }

        /*SIGN UP & REDIRECT
        TO LOGIN PAGE*/
        createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .then(() =>{
            navigate('/Login')
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    return(

        <div className="flex justify-center py-60">
            <div className="text-3xl mx-4 mt-6 font-bold"><h1>Signup page</h1></div>
            <div className="bg-gray-500 p-5">
                <div className="space-y-5">
                    <div className="block space-x-4">
                        <input onChange={(e) => setUserCredentials({...userCredentials, email: e.target.value})} value={userCredentials.email} placeholder="email here" type="email" />
                        <input onChange={(e) => setUserCredentials({...userCredentials, checkEmail: e.target.value})} value={userCredentials.checkEmail} placeholder="double check email" type="email" />
                    </div>
                    <div className="block space-x-4">
                        <input onChange={(e) => setUserCredentials({...userCredentials, password: e.target.value})} value={userCredentials.password} placeholder="password here" type="password" />
                        <input onChange={(e) => setUserCredentials({...userCredentials, checkPassword: e.target.value})} value={userCredentials.checkPassword} placeholder="double check password" type="password" />
                    </div>
                    <div>
                        <button onClick={handleSignUp} className="bg-gray-800 p-2 text-2xl mx-4 text-white">Signup</button>
                        <a href="/Login" className="text-2xl text-white bg-gray-800 p-2">Already have account?</a> 
                    </div>
                </div>
            </div>
        </div>

    )
}