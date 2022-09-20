import React from 'react';
import ReactPlayer from 'react-player/lazy'
import { useState } from 'react'
import PlayList from './PlayList'

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

    const PlayListMusic = (url) => {
        setUrl(url)
        setPlaying(true);
        setControls(true);
        setPlayList(true);
    }


    return(

        <div className="flex justify-center bg-[url('https://steamuserimages-a.akamaihd.net/ugc/945094571616867748/680E4979CC75A2310664E0883F3F3FC6CBECA3BE/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false')] bg-cover">   
            <div className="py-32 xl:backdrop-blur-sm">
                <div className="bg-gray-900 bg-opacity-30">
                    <div>
                        {playList ? (
                            <div className="rounded-sm">
                                <ReactPlayer
                                    width='850px'
                                    height='450px'
                                    loop = {loop}
                                    url={url}
                                    controls={controls}
                                    playing={playing}
                                    onEnded={(e) => setPlaying(false)}
                                />
                            </div>    
                        ): 
                        <div className="rounded-sm test max-w-2xl md:max-w-4xl sm:h-96">
                            <ReactPlayer
                                wrapper = 'test'
                                width='850px'
                                height='350px'
                                loop = {loop}
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
