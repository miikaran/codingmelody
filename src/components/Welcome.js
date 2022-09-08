import React from 'react';
import Navbar from './Navbar'
import Logo from '../assets/CodingMelody_Logo.svg'
import Blob from '../assets/blob1.svg'
import { AiOutlinePlayCircle } from 'react-icons/ai'

export default function Welcome(){

    return(
        <div className="text-2xl welcome h-screen">
            <Navbar />
            <div className="flex justify-center">
                <div className="mt-20">
                    <img src={Logo} />
                </div>
            </div>
            <img className="absolute opacity-25 max-w-6xl" src={Blob} style={{bottom: '50vh', right: '65vw'}} />
            <div className="flex flex-col items-center">
                <p className="max-w-3xl px-2 sm:px-10 text-gray-700 py-4 text-center" style={{fontSize: '1.4rem'}}>
                Listen to your favourite music from youtube and make your own playlists fully free of charge.
                <span className="font-bold"> Basically Spotify, but FREE.</span></p>
                <div className="flex gap-4">
                    <a href="/Signup" className="mt-3 tracking-tighter bg-rose-400 px-5 sm:px-10 text-white font-bold py-3 rounded-sm hover:tracking-tight hover:bg-rose-500 transition duration-200">
                        GET STARTED
                    </a>
                    <a href="/Signup" className="flex mt-3 tracking-tighter  bg-indigo-400 rounded-sm px-7 text-white py-3 font-bold hover:tracking-tight hover:bg-indigo-500 transition duration-200">
                       DEMO <AiOutlinePlayCircle className="mx-2 text-4xl"/>
                    </a>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}