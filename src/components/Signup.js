import React from 'react';

export default function Signup(){

    return(

        <div className="flex justify-center py-60">
            <div className="text-3xl mx-4 mt-6 font-bold"><h1>Signup page</h1></div>
            <div className="bg-gray-500 p-5">
                <div className="space-y-5">
                    <div className="block space-x-4">
                        <input placeholder="email here" type="email" />
                        <input placeholder="double check email" type="email" />
                    </div>
                    <div className="block space-x-4">
                        <input placeholder="password here" type="password" />
                        <input placeholder="double check password" type="password" />
                    </div>
                    <div>
                        <button className="bg-gray-800 p-2 text-2xl mx-4 text-white">Signup</button>
                        <a href="/Login" className="text-2xl text-white bg-gray-800 p-2">Already have account?</a> 
                    </div>
                </div>
            </div>
        </div>

    )
}