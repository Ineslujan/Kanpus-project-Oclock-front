import React from 'react';

import './addPlaceForm.scss'

export default function PlaceForm({tabClasseRoom, setClasseRoom}) {




    const handlePlace = (e) => {
        setClasseRoom(e.target.value);
    }

    return (
        <div className="place-form-container">
            <p className="form-label">Choisir un lieu</p>
            <div className="place-select-input-container">
                <select name="place" id="place-form" className="place-select" onChange={handlePlace}>
                    <option className="place-select-option" value={null}> Choisir une salle</option>
                    {tabClasseRoom.map((item,index) => (
                        <option className="place-select-option"  key={index} value={item.id}>{item.name}</option>
                    ))}
                </select>
                <input type="text" className="place-adress" />
        </div>
        </div>
    )
}
