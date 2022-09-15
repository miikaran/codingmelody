import React from 'react';
import ReactPlayer from 'react-player/lazy'
import { useState } from 'react'
import PlayList from './PlayList'
import { MdSkipNext } from 'react-icons/md'
import { IoMdPause, IoIosPlay } from 'react-icons/io'

export default function MusicPlayer(){


    // REACT PLAYER PARAMETERS //
    const [playing, setPlaying] = useState(false);
    const [url, setUrl] = useState();
    const [name, setName] = useState('Nothing here Yet :)');
    const [loop, setLoop] = useState(false);
    const [controls, setControls] = useState(true);
    const [volume, setVolume] = useState(1);

    // PLAYLIST MUSIC //
    const [playList, setPlayList] = useState(false);

    //SET SOME BUILT IN MUSIC //
    const [codingMix, setCodingMix] = useState(false);
    const [suomiMix, setSuomiMix] = useState(false);


    const CodingMix = () =>{
        setUrl('https://www.youtube.com/watch?v=rJdHvKWvk3Q&t=4s');
        setControls(true);
        setPlaying(true);
        setCodingMix(true);
    }

    const SuomiMix = () =>{
        setUrl('https://www.youtube.com/watch?v=J_nCaeYucrY');
        setControls(true);
        setPlaying(true);
        setSuomiMix(true);
    }


    const PlayListMusic = (url) => {
        setUrl(url)
        setPlaying(true);
        setControls(true);
        setPlayList(true);
    }

    const changeSongName = (name) => {
        setName(name)
    }


    return(

        <div className="flex md:flex-col md:items-center bg-[url('https://steamuserimages-a.akamaihd.net/ugc/945094571616867748/680E4979CC75A2310664E0883F3F3FC6CBECA3BE/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false')] bg-cover">
            <div className="mt-32 backdrop-blur-sm">
                <div className="flex flex-col items-center bg-gray-900 bg-opacity-30">
                    <div>
                        {playList ? (
                            <div className="rounded-sm">
                                <ReactPlayer
                                    width='850px'
                                    height='350px'
                                    loop = {loop}
                                    url={url}
                                    controls={controls}
                                    playing={playing}
                                    onEnded={(e) => setPlaying(false)}
                                />
                            </div>    
                        ): <img className="max-w-lg rounded-sm" src="https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />}                                 
                    </div> 

                    {/*<div className="text-white pb-10 pt-4 px-12 mt-12">
                            <div className="space-y-4 mx-2 flex flex-col">
                                <span className="text-sm">Currently On The Player...</span>
                                <span className="font-bold text-3xl">{name}</span>
                                <p className="font-medium">3:45 | Youtube | <button onClick={(e) => setLoop(true)} className="border mx-1 rounded-sm px-6 text-sm hover:border-gray-400 transition duration-200">Looping Is { loop ? ( <span className="text-green-500">On</span> ): <span className="text-red-500">Off</span>}</button></p>
                            </div>
                            <div className="space-y-7 mt-10">
                                <div className="flex justify-center mr-4 space-x-2">
                                    <button className="text-4xl" style={{transform: 'scaleX(-1)'}}><MdSkipNext /></button>
                                    <button onClick={(e) => {setPlaying(true)}} className="text-5xl play">
                                        {!playing ? (
                                        <IoIosPlay /> 
                                    ): null}
                                    </button>

                                    <button className="text-5xl" onClick={(e) => setPlaying(false)}>
                                        {playing ? (
                                            <IoMdPause />
                                    ): null}      
                                    </button>
                                    <button className="text-4xl"><MdSkipNext /></button>
                                </div>
                                <hr className="border-4 w-96 rounded-sm border-indigo-200" />
                            </div>
                        </div>*/}
                </div>

                <PlayList url={PlayListMusic} name={changeSongName} />
        
        
                <ul className="space-x-5 flex">
                    <button className="bg-gray-700 px-4 py-5 text-white font-bold" onClick={CodingMix}>
                    CODING MIX 
                    </button>
                    <button className="bg-gray-700 px-4 py-5 text-white font-bold" onClick={SuomiMix}>
                    SUOMI MIX
                    </button>                  
                </ul>

                {codingMix ? (
                    <ReactPlayer 
                        url={url}
                        playing={playing}
                        controls={controls}
                    />               
                ): null}

                {suomiMix ? ( 
                    <ReactPlayer 
                        url={url}
                        playing={playing}
                        controls={controls}
                    />   
                ): null} 

            </div>

        </div>

    )
}
