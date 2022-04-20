import React, {useState} from 'react';
import Close from '../../assets/images/icones-bags-svg/bi-x-square-fill.svg';

import './promoForm.scss'

export default function PromoForm({data, updateToggle, updateRoom}) {

    const [name, setName] = useState(data.promo);
    

    const changeName = (e) => {
        setName(e.target.value);
        console.log(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateRoom(data.trainee[0].promo_id, {
            name: name,
        })
        updateToggle()
    }

  return (
    <div className="promo">
        <div className="promo-update-content">
            <form className="promo-form" action="" onSubmit={handleSubmit}>
                <input className="promo-update-input" type="text" value={name} onChange={changeName} />
                    <div className="promo-form-buttons">
                        <button className="promo-validate">Valider</button>                    
                        <button className="promo-close" onClick={updateToggle}><img src={Close} alt="close" className="promo-close-icon" /></button>
                    </div>                      
            </form>
        </div>

    </div>
  )
}
