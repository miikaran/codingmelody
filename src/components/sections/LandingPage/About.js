import React from 'react'
import DemoImg2 from '../../../assets/Demoimg2.PNG'
import { Link } from 'react-router-dom';

export default function About(){

    return(
        <section className="py-16 bg-white">
            <div className="ml-40 lg:ml-72 lg:flex">
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
                    <div className="mt-10 space-x-4">
                        <Link to="/Signup">
                            <a className="text-2xl bg-indigo-500 py-3 rounded-sm px-6 font-bold text-white hover:bg-indigo-600 transition duration-200">SIGN UP NOW!</a>
                        </Link>
                        <Link to="/Signup">
                            <a className="text-2xl bg-indigo-500 py-3 rounded-sm px-6 font-bold text-white hover:bg-indigo-600 transition duration-200">SOURCE</a>
                        </Link>
                    </div>
                </div>
                <img className="max-w-lg md:mt-12 lg:mt-0 lg:ml-28 rounded-md shadow-2xl shadow-indigo-800" src={DemoImg2} />
            </div>
        </section>
    )
}