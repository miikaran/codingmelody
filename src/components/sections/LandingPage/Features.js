import React from 'react';

export default function Features(){

    return(
        
        <section className="flex justify-center bg-gray-100 pt-12 pb-12">
            <div className="text-center">
                <ul className="grid grid-cols-2 xl:grid-cols-4 text-xl xl:text-2xl font-bold text-gray-700 flex gap-20 xl:gap-52">
                    <li>
                    NO LIMITS!
                    <br />
                    <span className="font-normal text-sm">
                    No playlist or song limits
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
                    RESPONSIVE
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