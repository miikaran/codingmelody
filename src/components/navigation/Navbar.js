import React from 'react';
import { useState } from "react";
import { BiLogInCircle } from 'react-icons/bi'
import { RiContactsFill } from 'react-icons/ri'
import Logo from '../../assets/Untitled (2).svg'
import { Link } from 'react-router-dom';


export default function Navbar(){

    const [navbar, setNavbar] = useState(false);
    
    return(
        <nav className="w-full">
        <div className="justify-between px-4 mx-auto lg:max-w-8xl lg:items-center lg:flex lg:px-28">
            <div>
                <div className="flex items-center justify-between py-3 lg:py-6 lg:block">
                    <Link className="block mb-5" to="/">
                        <img className="w-48" src={Logo} />
                    </Link>
                    <div className="lg:hidden">
                        <button
                            className="p-2 text-gray-200 rounded-md outline-none focus:border-gray-400 focus:border"
                            onClick={() => setNavbar(!navbar)}
                        >
                            {navbar ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-10 h-10"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div

                    className={`flex-1 justify-self-center pb-3 mt-8 lg:block lg:pb-0 lg:mt-0 ${
                        navbar ? "block" : "hidden"
                    }`}
                >
                    <ul className="items-center text-gray-100 font-bold tracking-tighter justify-center text-xl space-y-6 lg:flex lg:space-x-20 lg:space-y-0">                           

                    <div className="sm:flex space-y-5 sm:space-y-0 sm:space-x-8">
                        <li>
                        <Link to="/Login" className="text-lg sm:text-xl font-bold text-white flex rounded-full bg-rose-400 py-3 px-8 hover:bg-rose-500 transition duration-200">
                            LOG IN <BiLogInCircle className="mt-1 text-2xl mx-1" />
                        </Link>
                        </li>

                        <li>
                        <Link to="/Signup" className="text-lg sm:text-xl flex rounded-full text-white bg-indigo-400 py-3 px-8 hover:bg-indigo-500 transition duration-200">
                            SIGN UP <RiContactsFill className="text-xl mx-2" style={{marginTop: '5px'}} />
                        </Link>
                        </li>  
                    </div>         

                    </ul>
                </div>
            </div>
        </div>
    </nav>
    )
}