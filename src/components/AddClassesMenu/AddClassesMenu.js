import React, {useState, useEffect} from 'react';

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
        <div className="promo-container">
            <button className="promo-title" onClick={togglePromos}>Promos</button>
            {showPromos && tabPromo.map((item, index)=> (
                    <button key={index} className="promo">{item}</button>
            ))}
        </div>
        <div className="groupe-container">
            <button className="groupe-title" onClick={toggleGroupes}>Groupes</button>
            {showGroupes && tabGroupe.map((item,index)=> (
                    <button key={index} className="groupe">{item}</button>
            ))}
        </div>
    </div>
  )
}

