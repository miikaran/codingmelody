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
import { RiPlayListFill } from 'react-icons/ri'

export default function PlayList(props) {

    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [items, setItems] = useState([]);
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

        <div className="text-white bg-opacity-20 px-4 space-y-10 mt-10">

            <div className="sm:flex justify-center space-x-0 space-y-6 sm:space-y-0 sm:space-x-3">
                <button onClick={() => setAddingItem(true)}className="flex text-white text-lg bg-indigo-500 bg-opacity-80 px-4 py-3 rounded-sm font-bold hover:bg-indigo-500 transition duration-200">
                        ADD SONGS<GiLoveSong className="text-2xl mx-2" />           
                </button>
                <input onChange={(e) => searchItems(e.target.value)} type="text" className="pl-3 pr-20 py-2 rounded-sm text-lg bg-gray-900 bg-opacity-60 border" placeholder="Search Your Songs..."/>                 
            </div>


            { addingItem ? (

                <div className="md:ml-52 bg-gray-900 px-6 py-6 border absolute">
                    <button onClick={() => setAddingItem(false)} className="flex border py-2 sm:py-1 px-3 sm:px-2 border-red-500 bg-red-500"><AiOutlineClose className="text-xs" /></button>
                    <span className="text-2xl font-bold">ADDING SONGS</span>
                    <form onSubmit={handleSubmit} className="sm:space-x-2 rounded-sm py-2 space-y-4 sm:space-y-0 sm:flex">
                        <input onChange={handleNameInputChange} value={name} type="text" className="pl-3 pr-4 py-3 sm:py-0 rounded-sm bg-gray-900 bg-opacity-60 border" placeholder="Enter Name Here.."/>        
                        <input onChange={handleUrlInputChange} value={url} type="text" className="pl-3 pr-4 border py-3 sm:py-0 rounded-sm bg-gray-900 bg-opacity-60" placeholder="Url Here.."/>
                        
                        <button type="submit" className="flex text-white sm:mx-2 bg-indigo-400 px-4 py-2 rounded-sm font-bold hover:bg-indigo-500 transition duration-200">
                            ADD ITEM<MdPlaylistAdd className="text-2xl mx-2" />           
                        </button>
                    </form>
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


            {noMatches ? (
                <div>
                    Nothing here
                </div>
            ): null}


            <div className="sm:mx-12 grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-0">

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
                                    <button onClick={() => passSongUrlToParent(item.PlaylistItem)}><IoIosPlay className="text-2xl" /></button>
                                    <button onClick={() => deleteFromFireBase(item.userId)}><IoIosRemoveCircleOutline className="text-2xl text-red-500" /></button>                               
                                </div>
                            )
                        })
                    ) : (

                        items.map(data => {

                            return(

                                <div className="bg-opacity-30 border border-white border-opacity-5 sm:space-x-4 flex bg-gray-900 px-5 py-3 rounded-sm">
                                    <div className="w-12 flex justify-center items-center">
                                        <img src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/146301004/original/265af19662a8925f79d1e3d2daff3c5c8277ee3c/create-album-covers-and-song-covers-for-cheap.jpg" />
                                    </div>

                                    <p className="flex pl-3 items-center font-bold text-xs sm:text-sm">{data.name}</p>
                        
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
