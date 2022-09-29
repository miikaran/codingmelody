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

        <div className="flex justify-center py-40 bg-mainpage bg-cover">   
            <div>
                <div className="bg-black bg-opacity-30">
                    {playList ? (     
                        <div className="rounded-sm test sm:px-0 h-96">
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

                    {choose ? (
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

    )
}
