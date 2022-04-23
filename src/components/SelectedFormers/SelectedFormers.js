import React, { useState,useEffect} from 'react';

import { v4 as uuid } from 'uuid';
import './selectedFormers.scss'

export default function SelectedFormers({selectedStatusFormer, setSelectedStatusFormer, allPromo, getStudents }) {

    const [toggleSelectPromo, setToggleSelectPromo] = useState(false)


    useEffect(() => {
        getStudents();
    }, [])

    const selectPromo = (item) => {
        setSelectedStatusFormer(item);
        setToggleSelectPromo(toggle =>!toggle)
    }

    const toggle= ()=> {
        setToggleSelectPromo(toggle =>!toggle)
    }


  return (
    <div className="select-promo">
           {selectedStatusFormer && <button className="select-ispermanent-button" onClick={toggle}>{selectedStatusFormer.is_permanent}</button>}
            {toggleSelectPromo && allPromo && allPromo.map((item)=> (
               selectedStatusFormer.is_permanent !== item.is_permanent && <button  className="select-ispermanent-button" key={uuid()} onClick={()=>selectPromo(item)}>{item.is_permanent}</button>
            ))}
        
    </div>
    
  )
}
