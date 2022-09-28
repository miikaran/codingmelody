import React from 'react';

export default function Cards(){

    return(
        <section className="flex justify-center pt-14 pb-24 bg-gray-50">      
            <div className="text-center pt-10 px-2 sm:px-0">
                <span className="text-4xl font-bold text-gray-700">Your Favourite Music Is Only Few Clicks Away.</span>
                <br />
                <p className="text-xl text-gray-700 max-w-4xl mt-4">
                With CodingMelody you can listen to your favourite music without any advertisement.
                <br />You just gotta <b>create an account</b>, <b>add music to your list</b> & <b>start vibing</b>.
                </p>
                <div className="mt-8 text-2xl font-bold text-white">
                    <a href="/" className="bg-rose-400 py-3 px-20 hover:bg-rose-500 transition duration-200">DEMO</a>
                </div>
            </div> 
        </section>
    )
}