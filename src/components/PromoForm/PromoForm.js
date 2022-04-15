import React, {useState} from 'react';

import '../../container/ClasseRoomCard/ClasseRoomForm/classeRoomForm.scss'

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
    <div className="class">
        <div className="classeroom-update-content">
            <form action="" onSubmit={handleSubmit}>
                <input className="classeroom-update-input" type="text" value={name} onChange={changeName} />
                <button className="classeroom-validate">Valider</button>    
                <div className="classeroom-button-close">
                    <button className="classeroom-close" onClick={updateToggle}>x</button>
                </div>        
            </form>
        </div>

    </div>
  )
}
