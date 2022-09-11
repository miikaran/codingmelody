import React from 'react';
import { useState, useEffect } from 'react'
import validator from 'validator'
import { uid } from 'uid'
import { onAuthStateChanged } from 'firebase/auth'
import { set, ref, onValue, remove } from 'firebase/database'
import { auth, db } from '../firebase/firebase'

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
            <div className="block">
                <form onSubmit={handleSubmit}>
                    <input onChange={handleNameInputChange} value={name} type="text" className="mt-32 py-3 pl-3 pr-16 text-sm border-2 border-gray-200" placeholder="SONG NAME"/>        
                    <input onChange={handleUrlInputChange} value={url} type="text" className="mt-32 py-3 pl-3 pr-16 text-sm border-2 border-gray-200" placeholder="ENTER URL HERE"/>
                    <button type="submit" className="text-white font-bold bg-gray-600 mt-4 py-3 px-4" >
                        ADD TO PLAYLIST            
                    </button>
                    <br />
    
                    <span className="text-red-400 mx-1 font-bold">{error}</span>

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
                     

                </form>


                {items.map(data => (
            
                    <div className="mt-8 flex">
                        
                        <button onClick={() => deleteFromFireBase(data.userId)} className="bg-red-500 mx-2 px-3">REMOVE</button>
                        <button onClick={() => passSongUrlToParent(data.PlaylistItem)} className="bg-green-500 mx-2 px-3">PLAY</button>
                        <ul className="text-xl">
                            <li className="flex gap-2"><span className="font-bold">SONG NAME:</span>{data.name}</li>
                            <li className="flex gap-2"><span className="font-bold">SONG URL:</span>{data.PlaylistItem}</li>
                        </ul>
                    </div>
                ))}

            </div>
            
        </div>
    )
}
