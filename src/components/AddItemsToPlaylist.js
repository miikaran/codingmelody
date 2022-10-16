import React from 'react'
import { useState, useEffect } from 'react'
import { MdPlaylistAdd } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { uid } from 'uid'
import { set, ref } from 'firebase/database'
import { auth, db } from '../firebase/firebase'
import { GiLoveSong } from 'react-icons/gi'
import validator from 'validator'
import AddItems from '../assets/AddItems.svg'


export default function AddItemsToPlaylist(props){

    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [addingItem, setAddingItem] = useState(false);

    const handleUrlInputChange = (event) => {
        setUrl(event.target.value);
    };
    const handleNameInputChange = (event) => {
        setName(event.target.value);
    };
    const handleThumbnailInputChange = (event) => {
        setThumbnail(event.target.value);
    };     

    //Do necessary validations & submit.
    const handleSubmit = (event) => { 
        event.preventDefault();
        if (!url || !validator.isURL(url) || !name) {
            setAddingItem(false); 
            props.displayErrorOnAdding();
        }
        else{
            writeToFireBase();
            setUrl('');
            setName('');
            setThumbnail('');
            setAddingItem(false)
        }
    };

    //Add new items to playlist.
    const writeToFireBase = () => {
        const userId = uid();
        set(ref(db, `${auth.currentUser.uid}/${props.playlistName}/${userId}`), {
            PlaylistItem: url, name,
            Thumbnail: thumbnail,
            Boolean: true,
            userId: userId,
        })
        props.setItemAdded(true);
        props.itemAddedSuccessfully();
        props.filterPlaylist(props.playlistName)
    }

    return(
        <div>
            <button onClick={() => setAddingItem(true)}className="flex text-white bg-indigo-700 px-4 py-3 rounded-sm font-bold hover:bg-indigo-800 transition duration-200">
                    ADD SONGS<GiLoveSong className="text-2xl mx-2" />           
            </button>
            {addingItem ? (
                <div className="sm:flex justify-center items-center bg-black bg-opacity-70 fixed inset-0 z-50">
                    <div className="bg-white bg-opacity-5 border border-white border-opacity-30 backdrop-blur-sm">                        
                        <button onClick={() => setAddingItem(false)} className="border p-2 border-red-500 bg-red-500"><AiOutlineClose className="text-xs" /></button>                                        
                        <form onSubmit={handleSubmit} className="rounded-sm pb-8 px-12 mt-5 space-y-5 flex flex-col">
                            <div className="flex space-x-4">
                                <div>
                                    <span className="text-xl sm:text-2xl font-bold">Add Items To Playlist</span>
                                    <p>Customizable options available.</p>
                                </div>    
                                <img alt="Adding Item" className="w-16 hidden sm:block" src={AddItems} />                   
                            </div>
                            <div className="flex flex-col space-y-2">
                                <input onChange={handleNameInputChange} value={name} type="text" className="pl-3 py-2 rounded-sm bg-gray-900 bg-opacity-80 border border-white border-opacity-30" placeholder="Enter Name Here.."/>        
                                <input onChange={handleUrlInputChange} value={url} type="text" className="pl-3 py-2 rounded-sm bg-gray-900 bg-opacity-80 border border-white border-opacity-30" placeholder="Enter Url Here.."/>
                                <span className="font-bold text-xs">Thumbnail <i>(Not necessary)</i></span>
                                <input onChange={handleThumbnailInputChange} value={thumbnail} type="text" className="pl-3 py-2 rounded-sm bg-gray-900 bg-opacity-80 border border-white border-opacity-30" placeholder="Enter Thumbnail URL.."/>
                            </div>             
                            <hr />
                            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-3 sm:space-y-0">
                                <button onClick={() => setAddingItem(false)} className="flex text-white bg-red-500 px-4 py-2 rounded-sm font-bold hover:bg-red-600 transition duration-200">
                                    CANCEL           
                                </button>
                                <button type="submit" className="flex text-white bg-indigo-500 px-4 py-2 rounded-sm font-bold hover:bg-indigo-600 transition duration-200">
                                    ADD ITEM<MdPlaylistAdd className="text-2xl mx-2" />           
                                </button> 
                            </div>                            
                        </form>
                    </div>
                </div>
            ): null}
        </div>
    )
}