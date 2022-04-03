import React from 'react';

import './addPlaceForm.scss'

export default function PlaceForm({classeRoom, setClasseRoom}) {

    const tabPlace = ["Studio", "Box1", "Box2", "Extérieur", "salle de cours", "salle info vidéographer"];

    const handlePlace = (e) => {
        setClasseRoom(e.target.value)
    }

    return (
        <div className="place-form-container">
            <p className="form-label">Choisir un lieu</p>
            <div className="place-select-input-container">
                <select name="place" id="place-form" className="place-select" onChange={handlePlace}>
                    <option className="place-select-option" value={classeRoom}> {classeRoom} </option>
                    {tabPlace.map((item,index) => (
                        <option className="place-select-option"  key={index} value={item}>{item}</option>
                    ))}
                </select>
                <input type="text" className="place-adress" />
        </div>
        </div>
    )
}
