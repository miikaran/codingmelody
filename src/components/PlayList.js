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
import { RiPlayListAddLine} from 'react-icons/ri'
import { BsThreeDotsVertical, BsFillTrashFill } from 'react-icons/bs'
import AddItems from '../assets/AddItems.svg'

export default function PlayList(props) {
    
    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [thumbnail, setThumbnail] = useState('')
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
    const [moreOptions, setMoreOptions] = useState(false);
    
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
    const handleThumbnailInputChange = (event) => {
        setThumbnail(event.target.value);
    };     


    const handleSubmit = (event) => { 

        event.preventDefault();
        if (!url || !validator.isURL(url) || !name) {   
            displayErrorOnAdding();
        }
        else{
            writeToFireBase();
            setUrl('');
            setName('');
            setThumbnail('');
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
            Thumbnail: thumbnail,
            Boolean: true,
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
        setItemDeleted(true)
        itemDeletedSuccessfully()
        filterPlaylist(playlistName)
    }


    /*DELETE PLAYLIST 
    FROM FIREBASE*/ 
    const deletePlaylistFromFireBase = (playlist) => {

        remove(ref(db, `${auth.currentUser.uid}/${playlist}`))
        .catch((err) => {
            alert(err.message)
        })
        setPlaylistName('')
        setDeletePlaylist(false)
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

        /*CREATE A DEFAULT 
        PLAYLIST FOR NEW USERS*/
        if(playlists.length == 0){
            set(ref(db, `${auth.currentUser.uid}/${playlist}`), {
                PlaylistName: playlist,
            })
        }
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

        <div className="text-white bg-black bg-opacity-40">

            {!choosePlaylist ? (
                <div className="flex flex-col justify-center pl-4 sm:pl-0 sm:items-center bg-black bg-opacity-90 fixed inset-0 z-50">
                    <div className="max-w-3xl sm:p-14 rounded-sm">
                        <span className="sm:text-2xl"><span className="text-6xl font-bold">Hello!👋</span> <br />Start by choosing your playlist. Don't worry, you can change it later. And If you're new, just choose the Default option.</span>
                        <br /><br />
                        <hr className="border w-52 hidden sm:block" />
                        <hr className="border w-32 mt-4 hidden sm:block" />
                        <br />
                        <div className="flex flex-col">
                            <select onChange={(e) => filterPlaylist(e.target.value)} className="text-xl bg-[url('https://i1.wp.com/mynaijadj.com/wp-content/uploads/2021/03/music-playlist.jpg?fit=1200%2C627&ssl=1')] bg-cover sm:text-3xl rounded-md border-2 border-white border-opacity-30 text-white sm:px-14 py-6">
                                <option className="bg-gray-900"></option>
                                {playlists.map((data) => (             
                                    <option className="bg-gray-900 font-light" value={data.PlaylistName}>{data.PlaylistName}</option>                     
                                ))}
                                {playlists.length == 0 ?(
                                    <option className="bg-gray-900 font-light" value="Default">Default</option>
                                ): null}                              
                            </select>
                        </div>
                    </div>      
                </div>
            ): null}

            {choosePlaylist ? (
            
                <div className="space-y-6 px-0 sm:px-12 pt-6">

                    <div className="flex flex-col sm:flex-row justify-center mx-2 sm:mx-0 space-x-0 space-y-6 sm:space-y-0 sm:space-x-3">
                        <button onClick={() => setAddingItem(true)}className="flex text-white bg-indigo-700 px-4 py-3 rounded-sm font-bold hover:bg-indigo-800 transition duration-200">
                                ADD SONGS<GiLoveSong className="text-2xl mx-2" />           
                        </button>
                        <button onClick={() => setAddingPlaylist(true)}className="flex text-white bg-indigo-700  px-4 py-3 rounded-sm font-bold hover:bg-indigo-800 transition duration-200">
                                CREATE PLAYLIST<RiPlayListAddLine className="text-2xl mx-2" />           
                        </button>
                        <input onChange={(e) => searchItems(e.target.value)} type="text" className="pl-3 pr-20 py-2 rounded-sm bg-gray-900 bg-opacity-70 backdrop-blur-sm border border-white border-opacity-20" placeholder="Search Your Songs..."/>                                
                    </div>

                    <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 mx-2 sm:mx-0">
                        <select onChange={(e) => filterPlaylist(e.target.value)} className="text-sm border border-white border-opacity-20 font-medium rounded-sm text-white px-2 py-1 bg-gray-900">
                            <option>Change Playlist</option>
                            {playlists.map((data) => (
                                <option value={data.PlaylistName}>{data.PlaylistName}</option>
                            ))}
                        </select>
                        <p className="text-lg sm:text-xl font-bold">Current Playlist | <i className="font-medium">{playlistName}</i></p>

                        <button onClick={() => {setDeletePlaylist(true)}} className="flex text-white bg-red-500 px-4 py-2 rounded-sm font-bold hover:bg-red-600 transition duration-200">
                            DELETE PLAYLIST <BsFillTrashFill className="text-lg mt-1 ml-2" />      
                        </button>

                        { deletePlaylist ? (
                            <div className="sm:flex justify-center items-center bg-black bg-opacity-70 fixed inset-0 z-50">
                                <div className="flex flex-col bg-white bg-opacity-5 border border-gray-500 backdrop-blur-sm px-8 max-w-lg text-center py-6 space-y-5">
                                    <span className="text-2xl">Are you sure you want delete playlist <i className="font-bold underline">{playlistName}</i>?</span> 
                                    <div className="flex justify-center space-x-3">                      
                                        <button onClick={() => {setDeletePlaylist(false)}}  className="py-2 px-8 text-sm sm:text-xl bg-red-500 font-bold hover:bg-red-600 transition duration-200">NO! I'M NOT</button>
                                        <button onClick={() => {deletePlaylistFromFireBase(playlistName)}}  className="text-white text-sm sm:text-xl bg-indigo-700 px-8 py-3 rounded-sm font-bold hover:bg-indigo-800 transition duration-200">YESSIR!</button>
                                    </div>                                          
                                </div>
                            </div>
                        ): null}

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


                    <div className="grid grid-cols-1 pb-10 gap-2 sm:gap-0">

                        {search.length > 0 ? (
                                searchedItems.map((item) => {
                                    return (
                                        <div>
                                            {item.PlaylistItem ? (
                                                <div className="flex justify-between items-center bg-opacity-20 border border-white border-opacity-5 bg-gray-900 rounded-sms pr-5 backdrop-blur-xl">                              
                                                    <button onClick={() => passSongUrlToParent((item.PlaylistItem), (item.name))} className="space-x-1 sm:space-x-4 flex items-center">                                          
                                                        <img className="w-12 sm:w-24" alt="Thumbnail" src={item.Thumbnail !== '' ? (item.Thumbnail): <p>y</p>} />                                                              
                                                        <div>
                                                            <p className="sm:pl-3 md:pr-5 text-xs sm:text-lg">{item.name}</p>
                                                        </div>
                                                    </button>
                                                    <div className="space-x-4 text-3xl mt-3">
                                                        <button onClick={() => passSongUrlToParent((item.PlaylistItem), (item.name))}><IoIosPlay className="hover:text-gray-400 transition duration-200" /></button>
                                                        <button onClick={() => setMoreOptions(toggle => !toggle)}> {moreOptions ? (<AiOutlineClose className="hover:text-gray-300 transition duration-200" />):<BsThreeDotsVertical className="hover:text-gray-300 transition duration-200" /> }</button>
                                                        
                                                        {moreOptions ? (
                                                                <button onClick={() => deleteFromFireBase(item.userId)}><IoIosRemoveCircleOutline className="text-red-500 hover:text-red-700 transition duration-200" /></button>                                           
                                                        ): null}
                                                    </div>
                                                </div>
                                            ): null}
                                        </div>
                                    )
                                })
                            ) : (

                                items.map(data => {

                                    return (
                                        <div>
                                            {data.PlaylistItem ? (
                                                <div className="flex justify-between items-center bg-opacity-20 border border-white border-opacity-5 bg-gray-900 pr-5 backdrop-blur-xl">               

                                                    <button onClick={() => passSongUrlToParent((data.PlaylistItem), (data.name))} className="flex items-center">                                                                                    
                                                        <img className="w-12 sm:w-24" alt="Thumbnail" src={data.Thumbnail}/>                                                   
                                                        <div>
                                                            <p className="pl-2 sm:pl-6 md:pr-9 text-xs sm:text-lg">{data.name}</p>
                                                        </div>
                                                    </button>
                                            
                                                    <div className="space-x-4 text-xl sm:text-3xl mt-3">
                                                        <button onClick={() => passSongUrlToParent((data.PlaylistItem), (data.name))}><IoIosPlay className="hover:text-gray-400 transition duration-200" /></button>
                                                        <button onClick={() => setMoreOptions(toggle => !toggle)}> {moreOptions ? (<AiOutlineClose className="hover:text-gray-300 transition duration-200" />):<BsThreeDotsVertical className="hover:text-gray-300 transition duration-200" /> }</button>
                                                        
                                                        {moreOptions ? (
                                                                <button onClick={() => deleteFromFireBase(data.userId)}><IoIosRemoveCircleOutline className="text-red-500 hover:text-red-700 transition duration-200" /></button>                                           
                                                        ): null}
                                                        
                                                    </div>
                                                </div>
                                            ): null}
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
