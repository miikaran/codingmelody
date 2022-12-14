import React from 'react';

export default function Features(){

    return(
        
        <section className="flex justify-center bg-gray-100 py-12">
            <div className="text-center">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-xl xl:text-2xl font-medium text-gray-700 flex gap-10 md:gap-20 xl:gap-48">
                    <li>
                    Unlimited
                    <br />
                    <span className="font-normal text-sm">
                    No song/playlist limits
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
                    Totally free
                    <br />
                    <span className="font-normal text-sm ">
                    No payment info needed
                    </span>
                    </li>
                    <li>
                    Flexible
                    <br />
                    <span className="font-normal text-sm">
                    Works on all devices
                    </span>
                    </li>
                </ul>
            </div>
        </section>
    )
}