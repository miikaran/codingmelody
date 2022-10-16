import React from 'react';
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { set, ref, onValue, remove } from 'firebase/database'
import { auth, db } from '../firebase/firebase'
import { IoIosPlay, IoIosRemoveCircleOutline } from 'react-icons/io'
import { AiOutlineClose } from 'react-icons/ai'
import { BsThreeDotsVertical, BsFillTrashFill } from 'react-icons/bs'
import AddItemsToPlaylist from './AddItemsToPlaylist'
import CreateNewPlaylist from './CreateNewPlaylist'
import SearchItems from './SearchItems'

export default function PlayList(props) {
    
    const [error, setError] = useState('');
    const [items, setItems] = useState([]);
    const [playlistName, setPlaylistName] = useState([]);
    const [itemAdded, setItemAdded] = useState(false);
    const [successfull, setSuccessfull] = useState('');
    const [itemDeleted, setItemDeleted] = useState(false);
    const [deleted, setDeleted] = useState('');
    const [noMatches, setNoMatches] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [choosePlaylist, setChoosePlaylist] = useState(false);
    const [deletePlaylist, setDeletePlaylist] = useState(false);
    const [moreOptions, setMoreOptions] = useState(false);
    const [search, setSearch] = useState([]);
    const [searchedItems, setSearchedItems] = useState([]);
    
    //Read users playlist data from firebase.
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

 
    const itemAddedSuccessfully = () => {
        setSuccessfull('Item Added')     
        setTimeout(() =>{
            setSuccessfull(null)
        }, 2000)            
    }


    const itemDeletedSuccessfully = () => {
        setDeleted('Item Deleted')     
        setTimeout(() =>{
            setDeleted(null)
        }, 2000)            
    }


    const passSongUrlToParent = (url) => {
        props.url(url);
    }


    const displayErrorOnAdding = () => {
        setError('Input Not Valid. Make sure to add name/URL')
        setTimeout(() =>{
            setError(null)
        }, 3000)
    }


    //Delete playlist items from playlist. 
    const deleteFromFireBase = (uid) => {
        remove(ref(db, `${auth.currentUser.uid}/${playlistName}/${uid}`))
        .catch((err) => {
            alert(err.message)
        })
        setItemDeleted(true)
        itemDeletedSuccessfully()
        filterPlaylist(playlistName)
    }


    //Delete playlist from firebase.
    const deletePlaylistFromFireBase = (playlist) => {
        remove(ref(db, `${auth.currentUser.uid}/${playlist}`))
        .catch((err) => {
            alert(err.message)
        })
        setPlaylistName('')
        setDeletePlaylist(false)
    }


    
    //Filter all playlists you have.
    const filterPlaylist = (playlist) => {
        //Create a default playlist for new users.
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


    //Handle search results from it's component.
    const searchItems = (search, searchedItems) => {
        setSearch(search)
        setSearchedItems(searchedItems)
    }
    

    return(

        <div className="text-white bg-black bg-opacity-40">

            {!choosePlaylist ? (
                <div className="flex flex-col justify-center pl-4 sm:pl-0 sm:items-center bg-black bg-opacity-90 backdrop-blur-lg fixed inset-0 z-50">
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
                                    <option key={data.PlaylistName} className="bg-gray-900 font-light" value={data.PlaylistName}>{data.PlaylistName}</option>                     
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
            
                <div className="space-y-6 px-0 sm:px-12 pt-8">

                    <div className="flex flex-col sm:flex-row justify-center mx-2 sm:mx-0 space-x-0 space-y-6 sm:space-y-0 sm:space-x-3">
                        <AddItemsToPlaylist 
                            displayErrorOnAdding={displayErrorOnAdding}
                            playlistName={playlistName} 
                            setItemAdded={setItemAdded}
                            itemAddedSuccessfully={itemAddedSuccessfully}
                            filterPlaylist={filterPlaylist}
                        />
                        <CreateNewPlaylist
                            displayErrorOnAdding={displayErrorOnAdding}
                            playlistName={playlistName} 
                            setItemAdded={setItemAdded}
                            itemAddedSuccessfully={itemAddedSuccessfully}
                            filterPlaylist={filterPlaylist}
                        />     
                        <SearchItems items={items} setNoMatches={setNoMatches} searchItems={searchItems}/>                               
                    </div>

                    <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 mx-2 sm:mx-0">
                        <select onChange={(e) => filterPlaylist(e.target.value)} className="text-sm border border-white border-opacity-20 font-medium rounded-sm text-white px-2 py-1 bg-gray-900">
                            <option value="">Change Playlist</option>
                            {playlists.map((data) => (
                                <option key={data.PlaylistName} value={data.PlaylistName}>{data.PlaylistName}</option>
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
                            <p>Nothing here</p>
                        </div>
                    ): null}


                    <div className="grid grid-cols-1 pb-10 gap-2 sm:gap-0">

                        {search.length - 1 > 0 ? (
                                searchedItems.map((item) => {
                                    return (
                                        <div key={item.userId}>
                                            {item.PlaylistItem ? (
                                                <div className="flex justify-between items-center bg-opacity-20 border border-white border-opacity-5 bg-gray-900 rounded-sms pr-5 backdrop-blur-xl">                              
                                                    
                                                    <button onClick={() => passSongUrlToParent((item.PlaylistItem), (item.name))} className="sm:space-x-4 flex items-center">                                          
                                                        <img className="w-12 sm:w-24" alt="Thumbnail" src={item.Thumbnail !== '' ? (item.Thumbnail): <p>y</p>} />                                                              
                                                        <div>
                                                            <p className="pl-2 sm:pl-6 md:pr-9 text-xs sm:text-lg">{item.name}</p>
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
                                        <div key={data.userId}>
                                            {data.PlaylistItem ? (
                                                <div className="flex justify-between items-center bg-opacity-20 border border-white border-opacity-5 bg-gray-900 pr-5 backdrop-blur-xl">               

                                                    <button onClick={() => passSongUrlToParent((data.PlaylistItem), (data.name))} className="flex items-center sm:space-x-4">                                                                                    
                                                        <img className="w-12 sm:w-24" alt="Thumbnail" src={data.Thumbnail}/>                                                   
                                                        <div>
                                                            <p className="pl-2 sm:pl-6 md:pr-9 text-xs sm:text-lg">{data.name}</p>
                                                        </div>
                                                    </button>
                                            
                                                    <div className="space-x-4 text-xl sm:text-3xl mt-3">
                                                        <button onClick={() => passSongUrlToParent((data.PlaylistItem), (data.name))}><IoIosPlay className="hover:text-gray-400 transition duration-200" /></button>
                                                        <button onClick={() => setMoreOptions(toggle => !toggle)}> {moreOptions ? (<AiOutlineClose className="hover:text-gray-300 transition duration-200" />):<BsThreeDotsVertical className="hover:text-gray-300 transition duration-200" /> }</button>
                                                        
                                                        {moreOptions ? (
                                                            <button onClick={() => deleteFromFireBase(data.userId)}><BsFillTrashFill className="text-red-500 hover:text-red-700 transition duration-200" /></button>                                                                                                  
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
