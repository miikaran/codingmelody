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

    const PlayListMusic = (url) => {
        setUrl(url)
        setPlaying(true);
        setControls(true);
        setPlayList(true);
    }


    return(

        <div className="flex justify-center py-40 bg-mainpage bg-cover">   
            <div className="xl:backdrop-blur-sm">
                <div className="bg-gray-900 bg-opacity-30">
                    <div>
                        {playList ? (
                            <div className="rounded-sm test sm:px-0 h-96">
                                <ReactPlayer
                                    wrapper='test'
                                    loop = 'true'
                                    url={url}
                                    controls={controls}
                                    playing={playing}
                                    onEnded={(e) => setPlaying(false)}
                                />
                            </div>    
                        ): 
                        <div className="rounded-sm test sm:px-0 h-96">
                            <ReactPlayer
                                wrapper='test'
                                loop = 'true'
                                url='https://www.youtube.com/watch?v=jfKfPfyJRdk'
                                controls={controls}
                            />
                        </div>    
                    }                                 
                    </div> 
                    <PlayList url={PlayListMusic}/>
                </div>
            </div>     
        </div>

    )
}
