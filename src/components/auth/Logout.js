import React from 'react';
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Untitled (1).svg'

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
            <button onClick={handleSignOut} className="flex absolute mr-12 mt-7 bg-indigo-400 text-white text-xl px-6 font-bold py-3 hover:bg-indigo-500 transition duration-200">
                LOG OUT <AiOutlineLogout className="text-xl mx-2 mt-1" />
            </button>
        </div>     
    )

}