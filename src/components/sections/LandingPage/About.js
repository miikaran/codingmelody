import React from 'react'
import DemoImg2 from '../../../assets/Demoimg2.PNG'
import { Link } from 'react-router-dom';
import { BsCodeSlash } from 'react-icons/bs'


export default function About(){

    return(
        <section className="py-24 bg-white">
            <div className="ml-4 sm:ml-20 md:ml-40 lg:ml-72 xl:flex">
                <div className="text-gray-700 mt-20">
                    <span className="text-4xl font-bold">What's CodingMelody All About?</span>
                    <div className="pt-4 w-20">
                        <hr className="border-2 border-gray-500" />
                    </div>
                    <div className="text-lg mt-2 max-w-2xl">
                        <p>CodingMelody is a web application which you can use to listen to your
                        favourite music from youtube without any ads interrupting it. It also works with videos,
                        but its main focus is on songs. 
                        You can use it on mobile & listen to music while your screen is off or you are browsing other applications.
                        </p>
                    </div>
                    <div className="mt-5">
                        <span className="text-2xl font-bold">How It Works?</span>
                        <div className="text-lg mt-2 max-w-2xl">
                            <p>When you're playing songs it embeds the song/video by the URL you gave to it when adding the song to your list.</p>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">         
                        <a href="/Signup" className="sm:text-2xl bg-indigo-500 py-3 rounded-sm px-6 font-bold mr-24 sm:mr-0 text-white hover:bg-indigo-600 transition duration-200">SIGN UP NOW!</a>               
                        <a href="https://github.com/miikaran/codingmelody" className="sm:text-2xl bg-indigo-500 mr-24 sm:mr-0 py-3 rounded-sm px-6 font-bold text-white hover:bg-indigo-600 transition duration-200 flex">SOURCE <BsCodeSlash className="ml-2 mt-1" /></a>          
                    </div>
                </div>
                <img className="hidden md:block sm:max-w-sm md:max-w-md xl:max-w-lg mt-20 md:mt-12 lg:mt-5 xl:ml-28 rounded-sm shadow-2xl shadow-indigo-800" src={DemoImg2} alt="Demo Image" />
            </div>
        </section>
        
    )
}