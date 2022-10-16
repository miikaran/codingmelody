import React from 'react'
import { useState } from 'react'
import { set, ref, onValue, remove } from 'firebase/database'
import { auth, db } from '../firebase/firebase'
import { MdPlaylistAdd } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { RiPlayListAddLine} from 'react-icons/ri'
import AddItems from '../assets/AddItems.svg'


export default function CreateNewPlaylist(props){

    const [playlistName, setPlaylistName] = useState([]);
    const [addingPlaylist, setAddingPlaylist] = useState(false);

    const handlePlaylistNameInputChange = (event) => {
        setPlaylistName(event.target.value);
    }; 

    const handlePlaylistSubmit = (event) => { 
        event.preventDefault();
        if (playlistName == '' || null){
            props.displayErrorOnAdding();
            setAddingPlaylist(false);
        }
        else{
            writeNewPlaylistToFireBase();
            setAddingPlaylist(false);
        }
    };

    //Create new playlist.
    const writeNewPlaylistToFireBase = () => {
    set(ref(db, `${auth.currentUser.uid}/${playlistName}`), {
        PlaylistName: playlistName,
    })
    props.setItemAdded(true);
    props.filterPlaylist(playlistName);
    }


    return(
        <div>
            <button onClick={() => setAddingPlaylist(true)}className="flex text-white bg-indigo-700  px-4 py-3 rounded-sm font-bold hover:bg-indigo-800 transition duration-200">
                    CREATE PLAYLIST<RiPlayListAddLine className="text-2xl mx-2" />           
            </button>
            {addingPlaylist ? (
            <div className="sm:flex justify-center items-center bg-black bg-opacity-70 fixed inset-0 z-50">
                <div className="bg-white bg-opacity-5 border border-white border-opacity-30 backdrop-blur-sm">
                    <button onClick={() => setAddingPlaylist(false)} className="border p-2 w-8 border-red-500 bg-red-500"><AiOutlineClose className="text-xs" /></button>
                    <form onSubmit={handlePlaylistSubmit} className="rounded-sm pb-9 pt-4 px-8 space-y-4 flex flex-col">
                        <div className="flex space-x-4">
                            <div>
                                <span className="text-xl sm:text-2xl font-bold">Create New Playlists</span>
                                <p>Filter Your Favourite Songs</p>
                            </div>    
                            <img alt="Adding Playlist"className="w-16 hidden sm:block" src={AddItems} />                   
                        </div>                    
                        <input onBlur={handlePlaylistNameInputChange} type="text" className="pl-3 pr-4 py-2 rounded-sm bg-gray-900 bg-opacity-80 border border-white border-opacity-30" placeholder="Enter Name Here.."/>                       
                        <hr />
                        <div className="flex space-x-2">
                            <button onClick={() => setAddingPlaylist(false)} className="flex text-white bg-red-500 px-4 py-3 rounded-sm font-bold hover:bg-red-600 transition duration-200">
                                CANCEL           
                            </button>
                            <button type="submit" className="flex text-white md:mx-2 bg-indigo-500 px-4 py-3 rounded-sm font-bold hover:bg-indigo-600 transition duration-200">
                                CREATE PLAYLIST<MdPlaylistAdd className="text-2xl mx-2" />           
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            ): null}
        </div>
    )
}