import React, { useState, useEffect } from 'react';
import ItemMenu from '../../container/ItemMenu/ItemMenu';
import { requestTrainee } from '../../requests/AddClassesFormRequest';

export default function PromoAndGroupMenu({ setSelectedStudents, tabPromos, setTabPromos, setPromoName }) {


    
    const [showPromos, setShowPromos] = useState(false);

    const [showStudents, setShowStudents] = useState(false);


    useEffect(() => {
        const getStudents = async () => {
            const trainees = await requestTrainee();
            if(trainees.status === 200){
                // setTabPromos(students.data.promos);
                // setPromoName(students.data.promos[0].name)
                // setSelectedStudents(students.data.promos[0].trainee)
                console.log
            }
        }
        getStudents()
    }, [])
    

    const togglePromos = () => {
        setShowPromos(showPromos => !showPromos);

    };


    return (
        <div className="menu">
        <div className='menu-container'>
            <div className="menu-items">
                
                <ItemMenu 
                    text={"Promos"} 
                    classN={"promo-title"} 
                    tab={tabPromos} 
                    toggle={togglePromos} 
                    show={showPromos}
                    setSelectedStudents={setSelectedStudents}
                    setShowStudents={setShowStudents}  
                />
            </div>  
           
        </div>
     
    </div>

  )
    
}