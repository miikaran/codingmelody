import React from 'react';

export default function Cards(){

    return(
        <section className="flex justify-center bg-gray-200 pt-10 pb-52">
            <div className="text-center pt-10">
                <span className="text-4xl font-medium text-gray-700">Your favourite music is only few clicks away.</span>
                <br />
                <p className="text-lg text-gray-700 max-w-4xl mt-6">
                Lorem Ipsum has been the industry's standard dummy text. 
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text.
                </p>
                <div className="grid grid-cols-3 gap-5">
                    <div className="bg-indigo-50 shadow-xl rounded-lg max-w-sm mt-10">
                        <div className="py-12">
                            dsd
                        </div>
                    </div>
                    <div className="bg-indigo-50 shadow-xl rounded-lg max-w-sm mt-10">
                        <div className="py-12">
                            dsd
                        </div>
                    </div>
                    <div className="bg-indigo-50 shadow-xl rounded-lg max-w-sm mt-10">
                        <div className="py-12">
                            dsd
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}