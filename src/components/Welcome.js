import React from 'react';

export default function Welcome(){

    return(
        <div className="text-2xl">
            hello
            <div className="text-2xl space-x-5 mt-10">
                <a href="/Signup" className="bg-gray-800 text-white">Signup</a>
                <a href="/Login" className="bg-gray-800 text-white">Login</a>
            </div>
        </div>
    )
}