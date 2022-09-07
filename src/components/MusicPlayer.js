import React from 'react';
import ReactPlayer from 'react-player/lazy'
import { useState } from 'react'
import PlayList from './PlayList'


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

        <div>

            <PlayList url={PlayListMusic} />

            <ul className="space-y-2">

                <button className="bg-gray-700 px-4 py-5 text-white font-bold" onClick={CodingMix}>
                CODING MIX 
                </button>
                <br />
                <button className="bg-gray-700 px-4 py-5 text-white font-bold" onClick={SuomiMix}>
                AMIS POPPI
                </button> 
                
            </ul>

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
                    url={url}
                    playing={playing}
                    controls={controls}
                />   
            ): null}



        </div>

    )
}
