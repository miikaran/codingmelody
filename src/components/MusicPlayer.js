import React from 'react';
import ReactPlayer from 'react-player/lazy'
import { useState } from 'react'
import PlayList from './PlayList'

export default function MusicPlayer(){

    // REACT PLAYER PARAMETERS //
    const [playing, setPlaying] = useState(false);
    const [url, setUrl] = useState();
    const [controls, setControls] = useState(true);

    // PLAYLIST MUSIC //
    const [playList, setPlayList] = useState(false);
    const [choose, setChoose] = useState(false);

    const PlayListMusic = (url) => {
        setUrl(url)
        setPlaying(true);
        setControls(true);
        setPlayList(true);
    }

    const choosePlaylists = (choose) => {
        setChoose(choose)
    }


    return(

        <div className="bg-mainpage bg-cover">
            <div className="flex justify-center sm:items-center py-36 sm:py-28 sm:h-screen"> 
                <div>
                    <div className="bg-black bg-opacity-30">
                        {playList ? (     
                            <div className="player sm:px-0 h-96">
                                <ReactPlayer
                                    wrapper='player'
                                    loop = 'true'
                                    url={url}
                                    controls={controls}
                                    playing={playing}
                                    onEnded={(e) => setPlaying(false)}
                                />
                            </div>
                        ): null}

                        {choose && !playList ? (
                            <div className="rounded-sm player sm:px-0 h-96">
                            <ReactPlayer
                                wrapper='player'
                                loop = 'true'
                                url='https://www.youtube.com/watch?v=jfKfPfyJRdk'
                                controls={controls}
                            />
                            </div>
                        ): null}                                 
                    </div>                      
                    <PlayList url={PlayListMusic} choose={choosePlaylists}/> 
                </div>    
            </div>
        </div>

    )
}
