import React from 'react';
import { useState, useEffect } from 'react'
import validator from 'validator'
import { uid } from 'uid'
import { onAuthStateChanged } from 'firebase/auth'
import { set, ref, onValue, remove } from 'firebase/database'
import { auth, db } from '../firebase/firebase'
import { IoIosPlay, IoIosRemoveCircleOutline } from 'react-icons/io'
import { MdPlaylistAdd } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { GiLoveSong } from 'react-icons/gi'
import { RiPlayListFill, RiPlayListAddLine } from 'react-icons/ri'

export default function PlayList(props) {

    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [searchedItems, setSearchedItems] = useState([]);
    const [addingItem, setAddingItem] = useState(false);
    const [playlistName, setPlaylistName] = useState([]);
    const [addingPlaylist, setAddingPlaylist] = useState(false);
    const [itemAdded, setItemAdded] = useState(false);
    const [successfull, setSuccessfull] = useState('');
    const [itemDeleted, setItemDeleted] = useState(false);
    const [deleted, setDeleted] = useState('');
    const [noMatches, setNoMatches] = useState(false);
    const [playlists, setPlaylists] = useState([]);

    
    /*READS USERS PLAYLIST
    DATA FROM FIREBASE*/
    useEffect(() =>{
        auth.onAuthStateChanged((user) => {         
            if(user){
                //onValue listens for events/changes & updates them.
                onValue(ref(db, `/${auth.currentUser.uid}/${playlistName}`), snapshot => {
                    setItems([])
                    setPlaylists([])
                    const data = snapshot.val()
                    if(data !== null){
                        Object.values(data).map((items) => {
                            setPlaylists((playlists) => [...playlists, items])
                            setItems((oldArray) => [...oldArray, items])             
                        })
                    }
                })
            }
            else{
                return null
            }
        })
    }, [])

    
    const handleUrlInputChange = (event) => {
        setUrl(event.target.value);
    };

    const handleNameInputChange = (event) => {
        setName(event.target.value);
    };

    const handlePlaylistNameInputChange = (event) => {
        setPlaylistName(event.target.value);
    };


    /*HANDLE ADDING
    PLAYLIST ITEMS*/
    const handleSubmit = (event) => { 

        event.preventDefault();
        if (!url || !validator.isURL(url) || !name){   
            displayErrorOnAdding();
        }
        else{
            writeToFireBase();
            setUrl('');
            setName('');
        }
    };


    const handlePlaylistSubmit = (event) => { 

        event.preventDefault();
        if (playlistName !== ''){
            writeNewPlaylistToFireBase();
        }
        else{
            displayErrorOnAdding();
        }
    };


    const itemAddedSuccessfully = () => {

        if(itemAdded){
            setSuccessfull('Item Added To Playlist')     
            setTimeout(() =>{
                setSuccessfull(null)
            }, 2000)            
        }
        else{
            return null
        }
    }


    const itemDeletedSuccessfully = () => {

        if(itemDeleted){
            setDeleted(`${name} Deleted Successfully From Playlist.`)     
            setTimeout(() =>{
                setDeleted(null)
            }, 2000)            
        }
        else{
            return null
        }
    }


    const passSongUrlToParent = (url) => {
        props.url(url);
    }


    const displayErrorOnAdding = () => {

        setError('Input Not Valid. Make sure to add song name and proper URL')
        setTimeout(() =>{
            setError(null)
        }, 3000)
    }


    /*WRITE PLAYLIST ITEMS TO 
    FIREBASE CURRENT USER*/
     const writeToFireBase = () => {

        const userId = uid();
        set(ref(db, `${auth.currentUser.uid}/${playlistName}/${userId}`), {
            PlaylistItem: url, name,
            userId: userId,
        })
        setItemAdded(true);
        itemAddedSuccessfully();
    }


    const writeNewPlaylistToFireBase = () => {
        
        set(ref(db, `${auth.currentUser.uid}/${playlistName}`), {
            PlaylistName: playlistName,
        })
        setItemAdded(true);
        itemAddedSuccessfully();
    }


    /*DELETE PLAYLIST 
    ITEMS FROM FIREBASE*/ 
    const deleteFromFireBase = (uid) => {

        remove(ref(db, `${auth.currentUser.uid}/${uid}`))
        .catch((err) => {
            alert(err.message)
        })
        setItemDeleted(true);
        itemDeletedSuccessfully();  
    }



    /*SEARCH 
    PLAYLIST ITEMS*/
    const searchItems = (searchValue) => {
        
        setSearch(searchValue)
        if(search !== '') {
            const data = items.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(search.toLocaleLowerCase())
            })
            setSearchedItems(data)

            if(data.length === 0){
                setNoMatches(true)
            }
            else{
                setNoMatches(false)
            }
        }
        else{
            setSearchedItems(items)
        }
    }


    const filterPlaylist = (playlist) => {

        setPlaylistName(playlist)
        onValue(ref(db, `/${auth.currentUser.uid}/${playlist}`), snapshot => {
            setItems([])
            const data = snapshot.val()
            Object.values(data).map((items) => {
                setItems((oldArray) => [...oldArray, items])             
            })   
        })
    }


    return(

        <div className="text-white bg-opacity-20 sm:px-12 space-y-7 mt-10">

            <div className="flex flex-col sm:flex-row justify-center mx-2 sm:mx-0 space-x-0 space-y-6 sm:space-y-0 sm:space-x-3">
                <button onClick={() => setAddingItem(true)}className="flex text-white text-lg bg-indigo-500 bg-opacity-80 px-4 py-3 rounded-sm font-bold hover:bg-indigo-500 transition duration-200">
                        ADD SONGS<GiLoveSong className="text-2xl mx-2" />           
                </button>
                <button onClick={() => setAddingPlaylist(true)}className="flex text-white text-lg bg-indigo-500 bg-opacity-80 px-4 py-3 rounded-sm font-bold hover:bg-indigo-500 transition duration-200">
                        CREATE PLAYLIST<RiPlayListAddLine className="text-2xl mx-2" />           
                </button>
                <input onChange={(e) => searchItems(e.target.value)} type="text" className="pl-3 pr-20 py-2 rounded-sm text-lg bg-gray-900 bg-opacity-60 border" placeholder="Search Your Songs..."/>                 
            </div>


            { addingItem ? (

                <div className="flex justify-center items-center bg-black bg-opacity-70 fixed inset-0">
                    <div className="bg-white">
                        <button onClick={() => setAddingItem(false)} className="border p-2 w-8 border-red-500 bg-red-500"><AiOutlineClose className="text-xs" /></button>
                        <form onSubmit={handleSubmit} className="md:space-x-2 rounded-sm pb-6 pt-4 px-5 space-y-3 sm:space-y-0 flex flex-col sm:flex-row">
                            <input onChange={handleNameInputChange} value={name} type="text" className="pl-3 pr-4 py-2 sm:py-0 rounded-sm bg-gray-900 bg-opacity-80" placeholder="Enter Name Here.."/>        
                            <input onChange={handleUrlInputChange} value={url} type="text" className="pl-3 pr-4 py-2 sm:py-0 rounded-sm bg-gray-900 bg-opacity-80" placeholder="Enter Url Here.."/>
                            
                            <button type="submit" className="flex text-white md:mx-2 bg-indigo-500 px-4 py-3 rounded-sm font-bold hover:bg-indigo-600 transition duration-200">
                                ADD ITEM<MdPlaylistAdd className="text-2xl mx-2" />           
                            </button>
                        </form>
                    </div>
                </div>
            ): null}



            { addingPlaylist ? (

            <div className="flex justify-center items-center bg-black bg-opacity-70 fixed inset-0">
                <div className="bg-white">
                    <button onClick={() => setAddingPlaylist(false)} className="border p-2 w-8 border-red-500 bg-red-500"><AiOutlineClose className="text-xs" /></button>
                    <form onSubmit={handlePlaylistSubmit} className="md:space-x-2 rounded-sm justify-center pb-6 pt-4 px-5 space-y-3 sm:space-y-0 flex flex-col sm:flex-row">
                        <input onChange={handlePlaylistNameInputChange} value={playlistName} type="text" className="pl-3 pr-4 py-2 sm:py-0 rounded-sm bg-gray-900 bg-opacity-80" placeholder="Enter Name Here.."/>                       
                        <button type="submit" className="flex text-white md:mx-2 bg-indigo-500 px-4 py-3 rounded-sm font-bold hover:bg-indigo-600 transition duration-200">
                            CREATE PLAYLIST<MdPlaylistAdd className="text-2xl mx-2" />           
                        </button>
                    </form>
                </div>
            </div>
            ): null}



            {itemAdded ? (
                    <div className="ml-20">
                        <p className="text-green-300 font-bold mx-1">{successfull}</p>
                    </div>
            ): null}
             

            {itemDeleted ? (
                <div className="ml-4 sm:ml-20">
                    <p className="text-red-500 font-bold mx-1">{deleted}</p>
                </div>
            ): null}

            <div className="block text-red-400 mx-1 font-bold">{error}</div>

            
            <div>
                <select onChange={(e) => filterPlaylist(e.target.value)} className="text-sm border font-medium rounded-sm text-white px-2 py-1 mt-1 bg-gray-900">
                    {playlists.map((data) => (
                        <option value={data.PlaylistName}>{data.PlaylistName}</option>
                    ))}
                </select>
            </div>


            {noMatches ? (
                <div>
                    Nothing here
                </div>
            ): null}


            <div className="grid grid-cols-1 lg:grid-cols-2 pb-10 gap-2 sm:gap-0">

                {search.length > 0 ? (
                        searchedItems.map((item) => {
                            return (
                                <div className="flex justify-between items-center bg-opacity-30 border border-white border-opacity-5 bg-gray-900 rounded-sms pr-5">
                                    <button onClick={() => passSongUrlToParent((item.PlaylistItem), (item.name))} className="space-x-1 sm:space-x-4 flex items-center">
                                        <div className="w-10 sm:w-20">
                                            <img alt="Thumbnail" src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149562217/original/fc77d96de1229ad6ca6f83289fd2d4b4c068a568/make-album-and-song-covers.jpg" />
                                        </div>
                                        <div>
                                            <p className="sm:pl-3 md:pr-5 text-xs sm:text-lg">{item.name}</p>
                                        </div>
                                    </button>
                                    <div className="space-x-4 text-3xl mt-3">
                                        <button onClick={() => passSongUrlToParent(item.PlaylistItem)}><IoIosPlay className="mt-3 text-2xl" /></button>
                                        <button onClick={() => deleteFromFireBase(item.userId)}><IoIosRemoveCircleOutline className="text-2xl mt-3 text-red-500" /></button>                               
                                    </div>
                                </div>
                            )
                        })
                    ) : (

                        items.map(data => {

                            return(

                                <div className="flex justify-between items-center bg-opacity-30 border border-white border-opacity-5 bg-gray-900 rounded-sms pr-5">
                                    <button onClick={() => passSongUrlToParent((data.PlaylistItem), (data.name))} className="space-x-1 sm:space-x-4 flex items-center">                                 
                                        <div className="w-10 sm:w-20">
                                            <img alt="Thumbnail" src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149562217/original/fc77d96de1229ad6ca6f83289fd2d4b4c068a568/make-album-and-song-covers.jpg" />
                                        </div>
                                        <div>
                                            <p className="sm:pl-3 md:pr-5 text-xs sm:text-lg">{data.name}</p>
                                        </div>
                                    </button>
                                    <div className="space-x-4 text-3xl mt-3">
                                        <button onClick={() => passSongUrlToParent((data.PlaylistItem), (data.name))}><IoIosPlay /></button>
                                        <button onClick={() => deleteFromFireBase(data.userId)}><IoIosRemoveCircleOutline className="text-red-500" /></button>                                                
                                    </div>
                                </div>
                            )

                        })
                    )}

            </div>

        </div>
            
    )
}
