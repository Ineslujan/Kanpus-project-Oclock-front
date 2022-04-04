import React, {useState} from 'react';

import ItemMenu from '../../container/ItemMenu/ItemMenu';

import './addClassesMenu.scss'

export default function AddClassesMenu() {

    const [showPromos, setShowPromos] = useState(false);
    const [showGroupes, setShowGroupes] = useState(false);

    const tabPromo = ['Zagreus', 'Motus', 'Apollo','Currie'];
    const tabGroupe = ['Montage', 'Atelier1', 'Montage3','Scénario'];

    const togglePromos = () => {
        setShowPromos(showPromos => !showPromos);
        console.log(showGroupes)
        if (showGroupes){
            setShowGroupes(false);
        } 
    };

    const toggleGroupes = () => {
        setShowGroupes(showGroupes => !showGroupes);
        if (showPromos){
            setShowPromos(false);
        }
    };


  return (
    <div className='menu-container'>
        <ItemMenu 
            text={"Promos"} 
            classN={"promo-title"} 
            tab={tabPromo} 
            toggle={togglePromos} 
            show={showPromos} 
        />
        <ItemMenu 
            text={"Groupes"} 
            classN={"groupe-title"} 
            tab={tabGroupe} 
            toggle={toggleGroupes} 
            show={showGroupes}  
        />  
    </div>
  )
}

