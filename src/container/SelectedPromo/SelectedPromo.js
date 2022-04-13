import React, { useState,useEffect} from 'react';

import { v4 as uuid } from 'uuid';
import './selectedPromo.scss'

export default function SelectedPromo({setSelectedPromo, selectedPromo, allPromo, setAllPromo, getStudents }) {

    const [toggleSelectPromo, setToggleSelectPromo] = useState(false)


    useEffect(() => {
        getStudents()
    }, [])

    const selectPromo = (item) => {
        setSelectedPromo(item);
        setToggleSelectPromo(toggle =>!toggle)
        // console.log("selectedPromo=>",item)
    }

    const toggle= ()=> {
        setToggleSelectPromo(toggle =>!toggle)
    }


  return (
    <div className="select-promo">
           {selectedPromo && <button onClick={toggle}>{selectedPromo.promo}</button>}
            {toggleSelectPromo && allPromo && allPromo.map((item)=> (
               selectedPromo.promo !== item.promo && <button  key={uuid()} onClick={()=>selectPromo(item)}>{item.promo}</button>
            ))}
        
    </div>
    
  )
}
