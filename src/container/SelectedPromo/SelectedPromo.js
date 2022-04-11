import React, { useState,useEffect} from 'react';
import { requestTrainee } from '../../requests/AddClassesFormRequest';
import { v4 as uuid } from 'uuid';
import './selectedPromo.scss'

export default function SelectedPromo({setSelectedPromo, selectedPromo, allPromo, setAllPromo }) {

    const [toggleSelectPromo, setToggleSelectPromo] = useState(false)


    useEffect(() => {
        const getStudents = async () => {
            const trainees = await requestTrainee();
            if(trainees.status === 200){
                setAllPromo(trainees.data)
                setSelectedPromo(trainees.data[0])
                // console.log('trainee=>',trainees.data)
            }
        }
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
