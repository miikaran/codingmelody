import React from 'react';
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { RiContactsFill } from 'react-icons/ri'
import { Link } from 'react-router-dom';

export default function Welcome(){

    return(
        <section className="text-2xl welcome">
            <div className="flex mx-4 sm:mx-16 lg:mx-32 xl:mx-60 mt-32 pb-48">
                <div className="flex flex-col">
                    <span className="text-indigo-300 tracking-widest font-inter text-lg"><a href="/Signup">0.1 Get Started</a></span>
                    <span className="text-4xl sm:text-6xl font-bold text-gray-100 leading-tight tracking-tighter">Enjoy Music Through <br />Cloud For Free. </span>
                    <p className="max-w-2xl text-gray-200 py-4 text-left" style={{fontSize: '1.4rem'}}>
                    Listen to your favourite music & playlists from youtube without ads fully free of charge.
                    <span className="font-bold"> Basically Spotify, but FREE.</span></p>
        
                    <div className="sm:flex sm:gap-4">
                        <Link to="/Signup" className="flex mt-3 text-lg sm:text-xl tracking-tighter bg-rose-400 px-5 sm:px-7 text-white font-bold py-3 rounded-sm hover:bg-rose-500 transition duration-200">
                            CREATE ACCOUNT <RiContactsFill className="mx-2 text-3xl" />
                        </Link>
                        <Link to="/" className="flex mt-3 tracking-tighter text-lg sm:text-xl bg-indigo-400 rounded-sm px-7 text-white py-3 font-bold hover:bg-indigo-500 transition duration-200">
                        DEMO <AiOutlinePlayCircle className="mx-2 text-3xl"/>
                        </Link>
                    </div>
                </div>  
            </div>
        </section>
    )
}