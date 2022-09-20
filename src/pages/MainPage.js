import React from 'react';
import MusicPlayer from '../components/MusicPlayer'
import Logout from '../components/auth/Logout'
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebase';

export default function MainPage(){

    const navigate = useNavigate();

   /*PREVENT USER FROM NAVIGATING TO
    MAINPAGE WITHOUT BEING LOGGED IN*/
    useEffect(() =>{
        auth.onAuthStateChanged((user) =>{
            if(!user){
                navigate('/')
            }
        })
    }, [])

    
    return(

        <>      
        <Logout />
        <MusicPlayer />       
        </>
    )
}