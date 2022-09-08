import React from 'react';
import Navbar from './Navbar'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import illustration from '../assets/Playlist-pana.svg'

export default function Welcome(){

    return(
        <div className="text-2xl welcome">
            <Navbar />
            <div className="flex mx-4 sm:mx-16 lg:mx-32 xl:mx-60 mt-32 pb-14">
                <div className="flex flex-col">
                    <span className="text-indigo-300 tracking-widest font-inter text-lg"><a href="/Signup">0.1 Get Started</a></span>
                    <span className="text-6xl font-bold text-gray-100 leading-tight tracking-tighter">Enjoy Music Through <br />Cloud For Free. </span>
                    <p className="max-w-2xl text-gray-200 py-4 text-left" style={{fontSize: '1.4rem'}}>
                    Listen to your favourite music from youtube and make your own playlists fully free of charge.
                    <span className="font-bold"> Basically Spotify, but FREE.</span></p>
        
                    <div className="flex gap-4">
                        <a href="/Signup" className="mt-3 text-xl tracking-tighter bg-rose-400 px-5 sm:px-7 text-white font-bold py-3 rounded-sm hover:tracking-tight hover:bg-rose-500 transition duration-200">
                            CREATE ACCOUNT
                        </a>
                        <a href="/Signup" className="flex mt-3 tracking-tighter text-xl bg-indigo-400 rounded-sm px-7 text-white py-3 font-bold hover:tracking-tight hover:bg-indigo-500 transition duration-200">
                        DEMO <AiOutlinePlayCircle className="mx-2 text-3xl"/>
                        </a>
                    </div>
                </div>  
            </div>
            <div className="flex justify-center bg-gray-100 pt-12 pb-12 mt-32">
                <div className="text-center">
                    <ul className="text-xl font-bold text-gray-700 flex gap-52">
                        <li>
                        00000+
                        <br />
                        <span className="font-normal text-sm">
                        Online Customers
                        </span>
                        </li>
                        <li>
                        800 000 000+
                        <br />
                        <span className="font-normal text-sm">
                        Songs & Videos
                        </span>
                        </li>
                        <li>
                        TOTALLY FREE!
                        <br />
                        <span className="font-normal text-sm ">
                        No info needed
                        </span>
                        </li>
                        <li>
                        500 000+
                        <br />
                        <span className="font-normal text-sm">
                        No payment credentials
                        </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-center bg-gray-300 pt-10 pb-10">
                <div className="text-center">
                    <span className="text-4xl font-bold text-gray-700">Your favourite music is only one click away.</span>
                </div>
            </div>
        </div>
    )
}