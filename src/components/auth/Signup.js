import React from 'react';
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.js'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/Untitled (2).svg'
import { Link } from 'react-router-dom'
import SignupImg from '../../assets/Signup.svg'
import { AiTwotoneMail } from 'react-icons/ai'

export default function Signup(){

    const navigate = useNavigate();
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
        checkPassword: ''
    });

    const handleSignUp = () => {

        /* ALERT IF INPUT FIELDS
          ARE NOT THE SAME */
        if(userCredentials.password !== userCredentials.checkPassword){
            alert('Passwords Are Not The Same.')
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

        <div className="flex justify-center mt-32 mr-32">
            <img className="bg-sky-200 px-14 bg-opacity-80 max-w-md" src={SignupImg} alt="Signup" />          
            <div className="bg-sky-200 bg-opacity-90 space-y-6 px-16 pb-10 pt-2">
                <img className="max-w-sm mx-2" src={Logo} />
                <div className="space-y-10">
                    <div className="space-y-5 flex flex-col">
                        <input className="py-3 px-4 rounded-sm" onChange={(e) => setUserCredentials({...userCredentials, email: e.target.value})} value={userCredentials.email} placeholder="Enter Your Email.." type="email" />                
                        <input className="py-3 px-4 rounded-sm" onChange={(e) => setUserCredentials({...userCredentials, password: e.target.value})} value={userCredentials.password} placeholder="Enter Your Password.." type="password" />
                        <input className="py-3 px-4 rounded-sm" onChange={(e) => setUserCredentials({...userCredentials, checkPassword: e.target.value})} value={userCredentials.checkPassword} placeholder="Confirm Your Password.." type="password" />
                        <button onClick={handleSignUp} className="bg-indigo-500 rounded-sm font-bold p-2 text-2xl mx-4 text-white hover:bg-indigo-600 transition duration-200">CREATE ACCOUNT</button>
                    </div>
                </div>
                
                <div className="flex justify-center text-center">
                    <span className="text-gray-700 font-bold">Already Have An Account? <br />Login Here <Link to="/Login" className="underline text-rose-500" href="">Here.</Link></span>
                </div>
            </div>
        </div>

    )
}