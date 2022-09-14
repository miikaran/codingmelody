import React from 'react';
import ReactPlayer from 'react-player/lazy'
import { useState } from 'react'
import PlayList from './PlayList'
import { MdSkipNext } from 'react-icons/md'
import { IoMdPause, IoIosPlay } from 'react-icons/io'

export default function MusicPlayer(props){


    // REACT PLAYER PARAMETERS //
    const [playing, setPlaying] = useState(false);
    const [url, setUrl] = useState();
    const [loop, setLoop] = useState(false);
    const [controls, setControls] = useState(true);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);

    //PLAY MUSIC FROM PLAYLIST //
    const [playList, setPlayList] = useState(false);

    //SET SOME BUILT IN MUSIC //
    const [codingMix, setCodingMix] = useState(false);
    const [amisPoppi, setAmisPoppi] = useState(false);

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
        setAmisPoppi(true);
    }


    const PlayListMusic = (url) =>{

        setUrl(url)
        setControls(true);
        setPlaying(true);
        setPlayList(true);
    }



    return(

        <div className="flex flex-col items-center mt-24">
            <div className="flex bg-gray-900">
                <img className="max-w-md" src="https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
                <div className="text-white pb-10 pt-4 px-8 mt-8">
                    <div className="space-y-3 mx-8">
                        <span className="font-bold text-3xl">Passenger - Let Her Go</span>
                        <p className="font-medium">3:45 | Youtube</p>
                    </div>
                    <div className="mx-8 space-y-5 mt-7">
                        <div className="flex justify-center mr-4 space-x-2">
                            <button className="text-4xl" style={{transform: 'scaleX(-1)'}}><MdSkipNext /></button>
                            <button className="text-5xl"><IoIosPlay /></button>
                            <button className="text-4xl"><MdSkipNext /></button>
                        </div>
                        <hr className="border-4 rounded-sm border-indigo-200" />
                    </div>
                </div>
            </div>

            <PlayList url={PlayListMusic} />
      
        

            {/*<ul className="space-y-2">

                <button className="bg-gray-700 px-4 py-5 text-white font-bold" onClick={CodingMix}>
                CODING MIX 
                </button>
                <br />
                <button className="bg-gray-700 px-4 py-5 text-white font-bold" onClick={SuomiMix}>
                AMIS POPPI
                </button> 
                
            </ul>*/}

            {codingMix ? (
                <ReactPlayer 
                    url={url}
                    playing={playing}
                    controls={controls}
                />               
            ): null}

            {amisPoppi ? ( 
                <ReactPlayer 
                    url={url}
                    playing={playing}
                    controls={controls}
                />   
            ): null}

            {playList ? (
                <ReactPlayer 
                    className="mt-9"
                    url={url}
                    playing={playing}
                    controls={controls}
                />          
            ): null}



        </div>

    )
}
