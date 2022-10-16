import React from 'react'
import { useState } from 'react'

export default function SearchItems(props){

    const [search, setSearch] = useState('');

    const handleSearchInputChange = (event) => {
        searchItems(event.target.value);
    }; 

    //Search items from current playlist.
    const searchItems = (searchValue) => {      
        setSearch(searchValue)
        if(search !== '') {
            const data = props.items.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(search.toLocaleLowerCase())
            })
            props.searchItems(search, data)

            if(data.length === 0){
                props.setNoMatches(true)
            }
            else{
                props.setNoMatches(false)
            }
        }
        else{
            props.searchItems(search, props.items)
        }
    }
    return(
        <div>
            <input onChange={handleSearchInputChange} type="text" className="pl-3 pr-20 py-2 rounded-sm bg-gray-900 bg-opacity-70 backdrop-blur-sm border border-white border-opacity-20" placeholder="Search Your Songs..."/> 
        </div>
    )
}