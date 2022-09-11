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

        <div className="flex justify-center">
            <div className="block bg-white rounded-sm shadow-xl p-10 space-y-5">
                <span className="text-3xl font-bold">Add Songs To Your Playlist & <br /> Create New Ones.</span>
                <hr className="border-2 w-20 border-gray-300 rounded-full" />

                <form onSubmit={handleSubmit} className="space-x-2 bg-gray-50 rounded-sm py-4 px-4 flex">

                    <input onChange={handleNameInputChange} value={name} type="text" className="py-3 pl-3 pr-10 text-sm rounded-sm border-2 border-gray-400" placeholder="Playlist Item Name Here.."/>        
                    <input onChange={handleUrlInputChange} value={url} type="text" className="py-3 pl-3 pr-12 text-sm border-2 rounded-sm border-gray-400" placeholder="Item Url Here.."/>

                    <button type="submit" className="flex text-white mx-2 bg-indigo-400 px-4 py-2 rounded-sm text-xl font-bold">
                        ADD ITEM<MdPlaylistAdd className="text-3xl mx-2" />           
                    </button>
                     
                </form>

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

                <div class="flex">
                    <select class="text-lg border-2 font-medium rounded-sm text-gray-600 pl-2 bg-gray-100">
                        <option>Filter By Playlist</option>
                        <option>Second</option>
                    </select>
                </div>

                {items.map(data => (
            
                    <div className="mt-8 flex bg-gray-200 bg-opacity-20 shadow-lg px-5 py-4 space-x-10 rounded-md">
                        
                        <ul className="text-lg space-y-1">
                            <li className="font-bold">{data.name}</li>
                            <li className="underline">{data.PlaylistItem}</li>
                        </ul>
    
                        <button onClick={() => passSongUrlToParent(data.PlaylistItem)}><AiOutlinePlayCircle className="text-4xl" /></button>
                        <button onClick={() => deleteFromFireBase(data.userId)}><BsTrash className="text-3xl text-red-700" /></button>
                       
                    </div>
                ))}

            </div>
            
        </div>
    )
}
