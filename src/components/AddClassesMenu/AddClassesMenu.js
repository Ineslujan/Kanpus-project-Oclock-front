import React, {useState} from 'react';
import PromoMenu from '../PromoMenu/PromoMenu';
import GroupeMenu from '../GroupeMenu/GroupeMenu';

import './addClassesMenu.scss'

export default function AddClassesMenu() {

    const [showPromos, setShowPromos] = useState(false);
    const [showGroupes, setShowGroupes] = useState(false)

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
       <PromoMenu tabPromo={tabPromo} togglePromos={togglePromos} showPromos={showPromos} />
       <GroupeMenu tabGroupe={tabGroupe} toggleGroupes={toggleGroupes} showGroupes={showGroupes}  />  
    </div>
  )
}

