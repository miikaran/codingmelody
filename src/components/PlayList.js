import React from 'react';
import { useState } from 'react'
import validator from 'validator'

export default function PlayList() {


    const [urlInput, setUrlInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    const [itemAdded, setItemAdded] = useState(false);
    const [successfull, setSuccessfull] = useState('');


    const handleUrlInputChange = event => {
        setUrlInput(event.target.value);
    };

    const handleNameInputChange = event => {
        setNameInput(event.target.value);
    };
    
    const handleSubmit = event => {

        event.preventDefault();

        if (!urlInput || !validator.isURL(urlInput) || !nameInput){   
            displayError();
        }
        else{
            itemAddedSuccesfully();
            addItem(urlInput, nameInput);
            setUrlInput('');
            setNameInput('');
        }
    };

  
    const addItem = (text, text2) => {  

        const newItems = [
            { text, text2 }
            , ...items
        ];     
        setItemAdded(true)
        setItems(newItems);
    };


    const removeItem = (index) => {

        const newItems = items.filter((items, itemIndex) =>{
            return itemIndex !== index;
        })
        setItems(newItems);
    };


    const itemAddedSuccesfully = () => {

        if(itemAdded){

            setSuccessfull('Item Added To Playlist')     
            setTimeout(() =>{
                setSuccessfull(null)
            }, 2000)            
        }
        else{
            return 0;
        }
    }


    const displayError = () => {

        setError('Input Not Valid')
        setTimeout(() =>{
            setError(null)
        }, 2000)
    }


    return(

        <div className="flex justify-center">
            <div className="block">
                <form onSubmit={handleSubmit}>
                    <input onChange={handleUrlInputChange} value={urlInput} type="text" className="mt-32 py-3 pl-3 pr-16 text-sm border-2 border-gray-200" placeholder="ENTER URL HERE"/>
                    <input onChange={handleNameInputChange} value={nameInput} type="text" className="mt-32 py-3 pl-3 pr-16 text-sm border-2 border-gray-200" placeholder="SONG NAME"/>        
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

                </form>

                {items.map(({text, text2}, index) => (
        
                <div className="mt-8 flex" key={index}>
                    <button onClick={() => removeItem(index)} className="bg-red-500 mx-2 px-3">REMOVE</button>
                    <ul className="text-xl" key={index}>
                        <li className="flex gap-2"><span className="font-bold">SONG NAME:</span>{text2}</li>
                        <li className="flex gap-2"><span className="font-bold">SONG URL:</span>{text}</li>
                    </ul>
                </div>

                ))}
            </div>
            
        </div>
    )
}
