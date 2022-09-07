import React from 'react';
import MusicPlayer from '../components/MusicPlayer'
import Logout from '../components/Logout'

export default function MainPage(){

    return(

        <div>
            <div className="p-4">
                <Logout />
            </div>
            <div>
                <MusicPlayer />
            </div>
        </div>
    )
}