import React from 'react';
import './promoMenu.scss'
        
export default function PromoMenu({tabPromo, togglePromos, showPromos}) {
    return (
        <div className="promo-container">
            <button className="promo-title" onClick={togglePromos}>Promos</button>
            {showPromos && tabPromo.map((item, index)=> (
                <button key={index} className="promo">{item}</button>
            ))}
        </div>
    )
 }
        