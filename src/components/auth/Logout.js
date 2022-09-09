import React from 'react';
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'

export default function Logout(){

    const navigate = useNavigate();

    const handleSignOut = () =>{
        
        signOut(auth)
        .then(() => {
            navigate('/')
        })
        .catch(err => {
            alert(err.message);
        })
    }

    return(
        <div className="flex justify-end">
            <button onClick={handleSignOut} className="bg-gray-800 text-white font-bold p-4">
                Logout
            </button>
        </div>
    )

}