import React from 'react';
import { useState, useEffect } from 'react'
import validator from 'validator'
import { uid } from 'uid'
import { onAuthStateChanged } from 'firebase/auth'
import { set, ref, onValue, remove } from 'firebase/database'
import { auth, db } from '../firebase/firebase'
import { IoIosPlay, IoIosRemoveCircle, IoIosRemoveCircleOutline } from 'react-icons/io'
import { MdPlaylistAdd, MdRemove, MdOutlineDeleteForever } from 'react-icons/md'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import { GiLoveSong } from 'react-icons/gi'
import { RiPlayListFill, RiPlayListAddLine } from 'react-icons/ri'

export default function PlayList(props) {

    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [items, setItems] = useState([]);
    const [playlist, setPlaylist] = useState('');
    const [search, setSearch] = useState('');
    const [searchedItems, setSearchedItems] = useState([]);
    const [addingItem, setAddingItem] = useState(false);
    const [itemAdded, setItemAdded] = useState(false);
    const [successfull, setSuccessfull] = useState('');
    const [itemDeleted, setItemDeleted] = useState(false);
    const [deleted, setDeleted] = useState('');
    const [noMatches, setNoMatches] = useState(false);
    
    /*READS USERS PLAYLIST
    DATA FROM FIREBASE*/
    useEffect(() =>{
        auth.onAuthStateChanged((user) => {         
            if(user){
                //onValue listens for events & changes & updates them.
                onValue(ref(db, `/${auth.currentUser.uid}`), snapshot => {
                    setItems([])
                    const data = snapshot.val()
                    if(data !== null){
                        Object.values(data).map((items) => {
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

    const handlePlaylistChange = (event) => {
        setPlaylist(event.target.value);
    }

  
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


    const passSongUrlToParent = (url, name) => {
        props.name(name)
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
        set(ref(db, `${auth.currentUser.uid}/${userId}`), {
            PlaylistItem: url, name,
            userId: userId,
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

            if(data.length == 0){
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


    return(

        <div className="bg-gray-900 text-white bg-opacity-20 px-4 py-14 space-y-7">

            <div className="flex justify-center space-x-3">
                <button onClick={() => setAddingItem(true)}className="flex text-white text-lg bg-indigo-500 bg-opacity-60 px-4 py-3 rounded-sm font-bold hover:bg-indigo-500 transition duration-200">
                        ADD SONGS<GiLoveSong className="text-2xl mx-2" />           
                </button>
                <button onClick={() => setAddingItem(true)}className="flex text-white text-lg bg-indigo-500 bg-opacity-60 px-4 py-3 rounded-sm font-bold hover:bg-indigo-500 transition duration-200">
                        ADD PLAYLISTS<RiPlayListFill className="text-2xl mx-2" />           
                </button>
                <button onClick={() => setAddingItem(true)}className="flex text-white text-lg bg-indigo-500 bg-opacity-60 px-4 py-3 rounded-sm font-bold hover:bg-indigo-500 transition duration-200">
                        CREATE PLAYLIST<RiPlayListAddLine className="text-2xl mx-2" />           
                </button>
            </div>


            { addingItem ? (

                <div className="mx-24 bg-gray-900 bg-opacity-60 px-6 py-4 border">
                    <button onClick={() => setAddingItem(false)} className="flex border py-1 px-2 border-red-500 bg-red-500"><AiOutlineClose className="text-xs" /></button>
                    <form onSubmit={handleSubmit} className="space-x-2 rounded-sm py-2 flex">
                        <input onChange={handleNameInputChange} value={name} type="text" className="pl-3 pr-4 rounded-sm bg-gray-900 bg-opacity-60 border" placeholder="Enter Name Here.."/>        
                        <input onChange={handleUrlInputChange} value={url} type="text" className="pl-3 pr-4 border rounded-sm bg-gray-900 bg-opacity-60" placeholder="Url Here.."/>
                        
                        <button type="submit" className="flex text-white mx-2 bg-indigo-400 px-4 py-2 rounded-sm font-bold hover:bg-indigo-500 transition duration-200">
                            ADD ITEM<MdPlaylistAdd className="text-2xl mx-2" />           
                        </button>
                    </form>
                </div>

            ): null}



            {itemAdded ? (
                    <div>
                        <p className="text-green-300 font-bold mx-1 absolute">{successfull}</p>
                    </div>
                ): null}

            {itemDeleted ? (
                <div>
                    <p className="text-red-500 font-bold mx-1 absolute">{deleted}</p>
                </div>
            ): null}

            <div className="block text-red-400 mx-1 font-bold">{error}</div>

            <div className="flex justify-center space-x-3">
                <select className="text-sm border font-medium rounded-sm text-white px-4 py-1 mt-1 bg-gray-900">
                    <option>Choose Playlist..</option>
                    <option>Second</option>
                </select>

                <input onChange={(e) => searchItems(e.target.value)}type="text" className="pl-3 pr-12 rounded-sm text-lg bg-gray-900 bg-opacity-60 border" placeholder="Search Playlist Songs..."/>                  
            </div>

            <div className="flex justify-center">
                <span className="text-2xl font-bold">Current Playlist - <span className="font-normal italic">Chill Yessir</span></span>
            </div>

            {noMatches ? (
                <div>
                    Nothing here
                </div>
            ): null}

            <div className="mx-52 md:mx-0 grid grid-cols-1 md:grid-cols-2">

                {search.length > 0 ? (
                        searchedItems.map((item) => {
                            return (
                                <div className="bg-opacity-30 border border-white border-opacity-5 flex space-x-4 bg-gray-900 px-5 py-3 rounded-sm">
                                    <div className="w-12">
                                        <img src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/146301004/original/265af19662a8925f79d1e3d2daff3c5c8277ee3c/create-album-covers-and-song-covers-for-cheap.jpg" />
                                    </div>
            
                                    <ul className="mt-3">
                                        <li className="font-bold text-sm">{item.name}</li>
                                    </ul>
            
                                    <button onClick={() => passSongUrlToParent((item.PlaylistItem), (item.name))}><IoIosPlay className="text-2xl" /></button>
                                    <button onClick={() => deleteFromFireBase(item.userId)}><IoIosRemoveCircleOutline className="text-2xl text-red-500" /></button> 
                                    
                                </div>
                            )
                        })
                    ) : (

                        items.map(data => {

                            return(

                                <div className="bg-opacity-30 border border-white border-opacity-5 flex space-x-4 bg-gray-900 px-5 py-3 rounded-sm">
                                    <div className="w-12">
                                        <img src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/146301004/original/265af19662a8925f79d1e3d2daff3c5c8277ee3c/create-album-covers-and-song-covers-for-cheap.jpg" />
                                    </div>

                                    <ul className="mt-3">
                                        <li className="font-bold text-sm">{data.name}</li>
                                    </ul>

                                    <button onClick={() => passSongUrlToParent((data.PlaylistItem), (data.name))}><IoIosPlay className="text-2xl" /></button>
                                    <button onClick={() => deleteFromFireBase(data.userId)}><IoIosRemoveCircleOutline className="text-2xl text-red-500" /></button>                              
                                </div>
                            )

                        })
                    )}

            </div>

        </div>
            
    )
}
