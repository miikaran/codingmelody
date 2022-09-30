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
import { RiPlayListFill, RiPlayListAddLine, RiWindowsFill } from 'react-icons/ri'
import { FiMoreVertical } from 'react-icons/fi'
import AddItems from '../assets/AddItems.svg'

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
    const [choosePlaylist, setChoosePlaylist] = useState(false);
    const [deletePlaylist, setDeletePlaylist] = useState(false);
    
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


    const handleSubmit = (event) => { 

        event.preventDefault();
        if (!url || !validator.isURL(url) || !name){   
            displayErrorOnAdding();
        }
        else{
            writeToFireBase();
            setUrl('');
            setName('');
            setAddingItem(false)
        }
    };


    const handlePlaylistSubmit = (event) => { 

        event.preventDefault();
        if (playlistName !== ''){
            writeNewPlaylistToFireBase();
            setAddingPlaylist(false)
        }
        else{
            displayErrorOnAdding();
        }
    };


    const itemAddedSuccessfully = () => {

        setSuccessfull('Item Added')     
        setTimeout(() =>{
            setSuccessfull(null)
        }, 2000)            
    }


    const itemDeletedSuccessfully = () => {

        setDeleted(`${name} Deleted Successfully`)     
        setTimeout(() =>{
            setDeleted(null)
        }, 2000)            
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
        filterPlaylist(playlistName);
    }


    /*CREATES NEW
    PLAYLIST TO FIREBASE*/
    const writeNewPlaylistToFireBase = () => {
        
        set(ref(db, `${auth.currentUser.uid}/${playlistName}`), {
            PlaylistName: playlistName,
        })
        setItemAdded(true);
        filterPlaylist(playlistName)
    }


    /*DELETE PLAYLIST 
    ITEMS FROM FIREBASE*/ 
    const deleteFromFireBase = (uid) => {

        remove(ref(db, `${auth.currentUser.uid}/${playlistName}/${uid}`))
        .catch((err) => {
            alert(err.message)
        })
        setItemDeleted(true);
        itemDeletedSuccessfully();
        filterPlaylist(playlistName)
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


    /*FILTERS ALL THE
    PLAYLISTS FROM CURRENT USER*/
    const filterPlaylist = (playlist) => {

        setChoosePlaylist(true)
        props.choose(true)
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

        <div className="text-white mt-6">

            {!choosePlaylist ? (
                <div className="flex flex-col justify-center pl-4 sm:pl-0 sm:items-center bg-black bg-opacity-90 fixed inset-0 z-50 space-y-5">
                    <div className="max-w-lg">
                        <span className="sm:text-xl"><span className="text-5xl font-bold">Hello!👋</span> <br /> Get started by choosing your playlist. <br /> don't worry, you can change it later.</span>
                        <br /><br />
                        <hr className="border-2 hidden sm:block" />

                        <select onChange={(e) => filterPlaylist(e.target.value)} className="text-xl sm:text-2xl border border-white border-opacity-5 text-white px-6 sm:px-14 py-6 bg-black bg-opacity-40 backdrop-blur-sm hover:bg-opacity-60 hover:backdrop-blur-lg transition duration-200">
                            <option className="bg-gray-900">CHOOSE PLAYLIST</option>
                            {playlists.map((data) => (
                                <option className="bg-gray-900 font-light" value={data.PlaylistName}>{data.PlaylistName}</option>
                            ))}
                        </select>  
                    </div>      
                </div>
            ): null}

            {choosePlaylist ? (
            
                <div className="space-y-6">

                    <div className="flex flex-col sm:flex-row justify-center mx-2 sm:mx-0 space-x-0 space-y-6 sm:space-y-0 sm:space-x-3">
                        <button onClick={() => setAddingItem(true)}className="flex text-white bg-indigo-700 px-4 py-3 rounded-sm font-bold hover:bg-indigo-800 transition duration-200">
                                ADD SONGS<GiLoveSong className="text-2xl mx-2" />           
                        </button>
                        <button onClick={() => setAddingPlaylist(true)}className="flex text-white bg-indigo-700  px-4 py-3 rounded-sm font-bold hover:bg-indigo-800 transition duration-200">
                                CREATE PLAYLIST<RiPlayListAddLine className="text-2xl mx-2" />           
                        </button>
                        <input onChange={(e) => searchItems(e.target.value)} type="text" className="pl-3 pr-20 py-2 rounded-sm bg-gray-900 bg-opacity-70 backdrop-blur-sm border border-white border-opacity-20" placeholder="Search Your Songs..."/>                                
                    </div>

                    <div className="flex flex-col sm:flex-row sm:space-x-10 mx-2 sm:mx-0">
                        <select onChange={(e) => filterPlaylist(e.target.value)} className="text-sm border border-white border-opacity-20 font-medium rounded-sm text-white px-2 py-1 bg-gray-900">
                            <option>Change Playlist</option>
                            {playlists.map((data) => (
                                <option value={data.PlaylistName}>{data.PlaylistName}</option>
                            ))}
                        </select>
                        <p className="mt-4 sm:mt-1 text-lg sm:text-xl font-bold">Current Playlist | <i className="font-medium">{playlistName}</i></p>
                    </div>  


                    { addingItem ? (

                        <div className="sm:flex justify-center items-center bg-black bg-opacity-70 fixed inset-0 z-50">
                            <div className="bg-white bg-opacity-5 border border-white border-opacity-30 backdrop-blur-sm">                        
                                <button onClick={() => setAddingItem(false)} className="border p-2 border-red-500 bg-red-500"><AiOutlineClose className="text-xs" /></button>                                        
                                <form onSubmit={handleSubmit} className="rounded-sm pb-8 px-12 mt-5 space-y-5 flex flex-col">
                                    <div className="flex space-x-4">
                                        <div>
                                            <span className="text-xl sm:text-2xl font-bold">Add Items To Playlist</span>
                                            <p>Customizable options available.</p>
                                        </div>    
                                        <img className="w-16 hidden sm:block" src={AddItems} />                   
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <input onChange={handleNameInputChange} value={name} type="text" className="pl-3 py-2 rounded-sm bg-gray-900 bg-opacity-80 border border-white border-opacity-30" placeholder="Enter Name Here.."/>        
                                        <input onChange={handleUrlInputChange} value={url} type="text" className="pl-3 py-2 rounded-sm bg-gray-900 bg-opacity-80 border border-white border-opacity-30" placeholder="Enter Url Here.."/>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold">Song Thumbnail <i className="text-red-400">(Not Necessary)</i></span>
                                        <input type="file" className="file:py-1 file:border file:bg-sky-100 file:px-4 file:rounded-md hover:file:cursor-pointer" />
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


                    { addingPlaylist ? (

                    <div className="sm:flex justify-center items-center bg-black bg-opacity-70 fixed inset-0 z-50">
                        <div className="bg-white bg-opacity-5 border border-white border-opacity-30 backdrop-blur-sm">
                            <button onClick={() => setAddingPlaylist(false)} className="border p-2 w-8 border-red-500 bg-red-500"><AiOutlineClose className="text-xs" /></button>
                            <form onSubmit={handlePlaylistSubmit} className="rounded-sm pb-9 pt-4 px-8 space-y-4 flex flex-col">
                                <div className="flex space-x-4">
                                    <div>
                                        <span className="text-xl sm:text-2xl font-bold">Create New Playlists</span>
                                        <p>Filter Your Favourite Songs</p>
                                    </div>    
                                    <img className="w-16 hidden sm:block" src={AddItems} />                   
                                </div>                    
                                <input onChange={handlePlaylistNameInputChange} type="text" className="pl-3 pr-4 py-2 rounded-sm bg-gray-900 bg-opacity-80 border border-white border-opacity-30" placeholder="Enter Name Here.."/>                       
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold">Playlist Thumbnail <i className="text-red-400">(Not Necessary)</i></span>
                                    <input type="file" className="file:py-1 file:px-4 file:rounded-sm hover:file:cursor-pointer" />
                                </div>
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



                    {itemAdded ? (
                            <div>
                                <p className="text-green-300 font-bold mx-1">{successfull}</p>
                            </div>
                    ): null}
                    

                    {itemDeleted ? (
                        <div>
                            <p className="text-red-500 font-bold mx-1">{deleted}</p>
                        </div>
                    ): null}

                    <div className="block text-red-400 mx-1 font-bold">{error}</div>

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
                                                    <img alt="Thumbnail" src="https://media.istockphoto.com/vectors/music-cloud-concept-cloud-shape-sound-waves-and-headphones-online-vector-id1282891289?k=20&m=1282891289&s=612x612&w=0&h=iYkzTbn4eatQ9LT42yu7eHzoh9pgxL_vnH_h9NfZ6BM=" />
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

                                        <div className="flex justify-between items-center bg-opacity-20 border border-white border-opacity-5 bg-gray-900 rounded-sms pr-5 backdrop-blur-xl">               
                                            <button onClick={() => passSongUrlToParent((data.PlaylistItem), (data.name))} className="space-x-1 sm:space-x-4 flex items-center">                                 
                                                <div className="w-10 sm:w-14">
                                                    <img alt="Thumbnail" src='https://media.istockphoto.com/vectors/music-cloud-concept-cloud-shape-sound-waves-and-headphones-online-vector-id1282891289?k=20&m=1282891289&s=612x612&w=0&h=iYkzTbn4eatQ9LT42yu7eHzoh9pgxL_vnH_h9NfZ6BM=' />
                                                </div>
                                                <div>
                                                    <p className="sm:pl-3 md:pr-5 text-xs sm:text-lg">{data.name}</p>
                                                </div>
                                            </button>
                                            <div className="space-x-4 text-3xl mt-3">
                                                <button onClick={() => passSongUrlToParent((data.PlaylistItem), (data.name))}><IoIosPlay className="hover:text-gray-400 transition duration-200" /></button>
                                                <button onClick={() => deleteFromFireBase(data.userId)}><IoIosRemoveCircleOutline className="text-red-500 hover:text-red-700 transition duration-200" /></button>                                                
                                            </div>
                                        </div>
                                    )

                                })
                            )}
                    </div>
                </div>
            ): null}
        </div>
            
    )
}
