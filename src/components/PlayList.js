import React from 'react';
import { useState, useEffect } from 'react'
import validator from 'validator'
import { uid } from 'uid'
import { onAuthStateChanged } from 'firebase/auth'
import { set, ref, onValue, remove } from 'firebase/database'
import { auth, db } from '../firebase/firebase'
import { AiOutlinePlayCircle, AiOutlinePlusSquare } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { MdPlaylistAdd } from 'react-icons/md'


export default function PlayList(props) {

    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [items, setItems] = useState([]);
    const [itemAdded, setItemAdded] = useState(false);
    const [successfull, setSuccessfull] = useState('');
    const [itemDeleted, setItemDeleted] = useState(false);
    const [deleted, setDeleted] = useState('');
    

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


    return(

        <div>
            <div className="bg-white shadow-xl px-12 py-14 space-y-5">

                <div className="flex flex-col tracking-tight">
                    <span className="text-4xl font-bold">Playlist Management</span>
                    <span className="text-xl font-bold mt-3">Add Songs & Videos To Your Playlist.</span>
                    <hr className="border mt-5 w-72 border-gray-300 rounded-full" />
                </div>

                <form onSubmit={handleSubmit} className="space-x-2 rounded-sm py-4 flex">

                    <input onChange={handleNameInputChange} value={name} type="text" className="pl-3 pr-14 rounded-sm border border-gray-400" placeholder="Enter Name Here.."/>        
                    <input onChange={handleUrlInputChange} value={url} type="text" className="pl-3 pr-14 border rounded-sm border-gray-400" placeholder="Url Here.."/>

                    <button type="submit" className="flex text-white mx-2 bg-indigo-400 px-4 py-2 rounded-sm font-bold hover:bg-indigo-500 transition duration-200">
                        ADD ITEM<MdPlaylistAdd className="text-2xl mx-2" />           
                    </button>
                    
                </form>

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

                
                <div className="flex justify-center">

                    <div className="grid grid-cols-2 gap-x-4">

                        {items.map(data => (
            
                            <div className="mt-4 bg-opacity-30 border flex bg-gray-200 px-5 py-4 gap-5 rounded-sm">
                                
                                <ul className="space-y-1">
                                    <li className="font-bold text-sm">{data.name}</li>
                                    <li className="underline text-xs">{data.PlaylistItem}</li>
                                </ul>
            
                                <button onClick={() => passSongUrlToParent(data.PlaylistItem)}><AiOutlinePlayCircle className="text-2xl" /></button>
                                <button onClick={() => deleteFromFireBase(data.userId)}><BsTrash className="text-2xl text-red-700" /></button>
                            
                            </div>

                        ))}
                    </div>  

                </div>

            </div>
            
        </div>
    )
}
