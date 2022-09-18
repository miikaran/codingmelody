import React from 'react';
import { useState } from 'react'
import { IoIosPlay, IoIosRemoveCircleOutline } from 'react-icons/io'

export default function BuiltInMusic(props){

    const [chooseLofi, setChooseLofi] = useState(false);
    const [chooseIndie, setChooseIndie] = useState(false);
    const [chooseSuomi, setChooseSuomi] = useState(false);
    const [choosePop, setChoosePop] = useState(false);

    //BUILT IN MUSIC  
    const Lofi = [{
        url: 'https://www.youtube.com/watch?v=n61ULEU7CO0', 
        thumbnail: 'https://i.ytimg.com/vi/n61ULEU7CO0/maxresdefault.jpg'
    }, {
        url: 'https://www.youtube.com/watch?v=tgI6PjEq0O8',
        thumbnail: 'https://i.ytimg.com/vi/tgI6PjEq0O8/maxresdefault.jpg'
    }, {
        url: 'https://www.youtube.com/watch?v=1oahTaVIQvk',
        thumbnail: 'https://i.ytimg.com/vi/1oahTaVIQvk/maxresdefault.jpg'
    }]

    const Indie = [{
        url: 'https://www.youtube.com/watch?v=pYGgUsPKjYo', 
        thumbnail: 'https://i.ytimg.com/vi/pYGgUsPKjYo/maxresdefault.jpg'
    }, {
        url: 'https://www.youtube.com/watch?v=YeZLk-P0FhE',
        thumbnail: 'https://i.ytimg.com/vi/YeZLk-P0FhE/maxresdefault.jpg'
    }]

    const Suomi = [{
        url: 'https://www.youtube.com/watch?v=J_nCaeYucrY', 
        thumbnail: 'https://i.ytimg.com/vi/J_nCaeYucrY/maxresdefault.jpg'
    }]


    const Pop = [{
        url: 'https://www.youtube.com/watch?v=xxJuduouoS4', 
        thumbnail: 'https://i.ytimg.com/vi/xxJuduouoS4/maxresdefault.jpg'
    }]


    const filterLofi = () => {
        setChooseLofi(true)
        setChooseIndie(false);
        setChooseSuomi(false);
        setChoosePop(false);
    }

    const filterIndie = () => {
        setChooseIndie(true)
        setChooseLofi(false);
        setChooseSuomi(false);
        setChoosePop(false);
    }

    
    const filterSuomi = () => {
        setChooseSuomi(true)
        setChooseLofi(false);
        setChooseIndie(false);
        setChoosePop(false);
    }

    
    const filterPop = () => {
        setChoosePop(true)
        setChooseLofi(false);
        setChooseSuomi(false);
        setChooseIndie(false);
    }




    return(
        <div className="text-white flex flex-col justify-center">
            <div className="flex flex-col">
                <div className="font-bold grid gap-x-0 grid-cols-2">
                    <button onClick={() => filterLofi()} className="bg-[url('https://media.npr.org/assets/img/2022/07/14/lofi-girl-picture_custom-27a34c6d0ca36f828940156e7bd3c964140cff9c.jpg')] bg-cover p-16 rounded-sm">
                        <span className="text-2xl bg-gray-900 bg-opacity-70 px-2 py-1 rounded-lg">Lofi</span>
                    </button>
                    <button  onClick={() => filterIndie()} className="bg-[url('https://images.squarespace-cdn.com/content/v1/5c292bfdc258b4b91b8021a5/1587833888867-28W7VRQBVPEGUPAQWP24/LostIndieClassicsVol1.2.jpg?format=1000w')] bg-cover p-16 rounded-sm">
                        <span className="text-2xl bg-gray-900 bg-opacity-70 px-2 py-1 rounded-lg">Indie</span>
                    </button>
                    <button onClick={() => filterSuomi()} className="bg-center bg-[url('https://cdn-profiles.tunein.com/s9078/images/logod.png?t=158696')] bg-cover p-16 rounded-sm">
                        <span className="text-2xl bg-gray-900 bg-opacity-70 px-2 py-1 rounded-lg">Suomi</span>
                    </button>
                    <button onClick={() => filterPop()} className="bg-center bg-[url('https://play-lh.googleusercontent.com/zWXih1je17LhskElV-vhePIZt2Y-ITOBnew2lY5sx-njXutzQNyXOzx82z-nPhvQ8dA')] bg-cover p-16 rounded-sm">
                        <span className="text-2xl bg-gray-900 bg-opacity-70 px-2 py-1 rounded-lg">Pop</span>
                    </button>
                    <button className="bg-[url('https://play-lh.googleusercontent.com/8cslWPWWj9tKoVot10Zx6JrGvSeJZ8LPFBp54GQAknYBBtfv5nRxm-ZO2GgmLX8rPg')] bg-cover p-16 rounded-sm">
                        <span className="text-2xl bg-gray-900 bg-opacity-70 px-2 py-1 rounded-lg">Country</span>
                    </button>
                    <button className="bg-[url('https://t4.ftcdn.net/jpg/04/76/63/07/360_F_476630734_xWGxB69fL9jDSJjzhboacAJxJ43kr3z9.jpg')] bg-cover p-16 rounded-sm">
                        <span className="text-2xl bg-gray-900 bg-opacity-70 px-2 py-1 rounded-lg">Rap</span>
                    </button>
                    <button className="bg-[url('https://play-lh.googleusercontent.com/5k_SPaQEAY-Mwa8P632d65X2M4eCbzvcgsz8lKvnXi4KgtkTzd1M3l0rPR_2S4jHQQ')] bg-center bg-cover p-16 rounded-sm">
                        <span className="text-2xl bg-gray-900 bg-opacity-70 px-2 py-1 rounded-lg">Techno</span>
                    </button>
                    <button className="bg-[url('https://img.freepik.com/premium-vector/rock-roll-logo-design-inspiration_613566-215.jpg?w=2000')] bg-center bg-cover p-16 rounded-sm">
                        <span className="text-2xl bg-gray-900 bg-opacity-70 px-2 py-1 rounded-lg">Rock</span>
                    </button>
                </div>
            </div>

             <ul className="grid grid-cols-4 absolute">
                {chooseLofi ? (
                    Lofi.map(data => (
                        <button onClick={() => {props.url(data.url)}} className="flex justify-center items-center hover:opacity-70 transition duration-200">
                            <IoIosPlay className="absolute text-3xl" /> 
                            <img className="w-40" src={data.thumbnail} />
                        </button>
                    ))
                ): null}

                {chooseIndie ? (
                    Indie.map(data => (
                        <button onClick={() => {props.url(data.url)}} className="flex justify-center items-center hover:opacity-70 transition duration-200">
                            <IoIosPlay className="absolute text-3xl" /> 
                            <img className="w-40" src={data.thumbnail} />
                        </button>
                    ))
                ): null}

                {chooseSuomi ? (
                    Suomi.map(data => (
                        <button onClick={() => {props.url(data.url)}} className="flex justify-center items-center hover:opacity-70 transition duration-200">
                            <IoIosPlay className="absolute text-3xl" /> 
                            <img className="w-40" src={data.thumbnail} />
                        </button>
                    ))
                ): null}

                {choosePop ? (
                    Pop.map(data => (
                        <button onClick={() => {props.url(data.url)}} className="flex justify-center items-center hover:opacity-70 transition duration-200">
                            <IoIosPlay className="absolute text-3xl" /> 
                            <img className="w-40" src={data.thumbnail} />
                        </button>
                    ))
                ): null}

            </ul>
        </div>
    )
}