import React from 'react';
import ReactPlayer from 'react-player/lazy'
import { useState } from 'react'
import PlayList from './PlayList'


export default function MusicPlayer(){


    const [playing, setPlaying] = useState(false);
    const [url, setUrl] = useState();
    const [loop, setLoop] = useState(false);
    const [controls, setControls] = useState(true);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);


    //SET SOME BUILT IN MUSIC //

    const LofiMix = () =>{

        setUrl('https://www.youtube.com/watch?v=-25TOV4ll30&list=PLOBaP9y84HHHfU5Mlj-nmwNetQhcAU2-l&index=1');
        setControls(true);
        setPlaying(true);

    }



    return(

        <div>

            <PlayList />

            <button onClick={LofiMix}>
            START LOFI  
            </button> 

            {LofiMix ? ( <ReactPlayer 
                url={url}
                playing={playing}
                controls={controls}
             />   
            ): null}  

        </div>

    )
}
