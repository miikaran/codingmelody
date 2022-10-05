import React from 'react'
import DemoImg from '../../../assets/codingmelody1.PNG'

export default function About(){

    return(
        <section className="py-4 sm:py-16 bg-white">
            <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="text-gray-700 mt-14 sm:mt-0">
                    <span className="text-indigo-500 tracking-widest font-medium font-inter text-xl">0.2 About</span>
                    <br />
                    <span className="text-3xl font-bold">Platform for listening your favourite <br />  music with different features. </span>
                    <div className="pt-4 w-20">
                        <hr className="border-2 border-gray-500" />
                    </div>
                    <div className="mt-6 max-w-xl">
                        <p>CodingMelody is a web application which you can use to listen to your
                        favourite music from YouTube without any ads interrupting it. You can also create your own
                        playlists & enjoy them free of charge. On mobile you can use it even if screen is off.
                        </p>
                    </div>
                    <div className="mt-6">
                        <span className="text-2xl font-medium">How It Works?</span>
                        <div className="mt-2 max-w-xl">
                            <p>It works just like any other music player, except you have the entirety of YouTube to get music from!
                            So first you find a song from YouTube, <b>copy the url</b>, <b>open CodingMelody</b>, <b>add songs</b> & <b>paste it there</b>!
                            When you create playlists, you can use them to filter different genres of music & switch from one to another easily.</p>
                        </div>
                    </div>
                    <div className="mt-8">         
                        <a href="/Signup" className="bg-indigo-500 py-3 rounded-sm px-6 font-medium mr-24 sm:mr-0 text-white hover:bg-indigo-600 transition duration-200">Sign Up Now</a>               
                    </div>
                </div>
    
                <img className="hidden md:block max-w-sm lg:max-w-sm xl:max-w-md mt-20 md:mt-14 lg:mt-5 lg:ml-32 rounded-sm shadow-2xl shadow-gray-900" src={DemoImg} alt="Demo Image" />
                
            </div>
        </section>
        
    )
}