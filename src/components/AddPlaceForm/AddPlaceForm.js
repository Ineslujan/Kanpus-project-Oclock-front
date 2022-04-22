import React, {useState, useEffect} from 'react';

import './addPlaceForm.scss'

export default function PlaceForm({tabClasseRoom,setClasseRoom,adress, setAdress, seeClasse, setSeeClasse}) {

    const [placeAvailable, setPlaceAvailable] = useState([]);
    const [placeNotAvailable, setPlaceNotAvailable] = useState([]);
    const [seePlace, setSeePlace] = useState(false);

    const [modaleInfoClasseRoom, setModaleInfoClasseRoom] = useState(false);
    const [modaleInfoItem, setModaleInfoItem] = useState();

    useEffect(() => {
        setPlaceAvailable(tabClasseRoom.filter((item) => item.event[0] === null));
        console.log('teacherEvent1 =>', placeAvailable);
        setPlaceNotAvailable(tabClasseRoom.filter((item) => item.event[0] !== null));
        console.log('teacherEvent2 =>', placeNotAvailable, seeClasse );
    }, [tabClasseRoom]);

    const showAllPlaces = () => {
        setSeePlace(seePlace => !seePlace)
    }
    
    const handlePlace = (item) => {
        setClasseRoom(item.id);
        setSeePlace(false);
        setSeeClasse(item.name);
        console.log('item',item)
    };

    const handleAdress = (e) => {
        setAdress(e.target.value);
    }

    const info = (item) => {
        setModaleInfoClasseRoom(true);
        setModaleInfoItem(item);
        console.log(item)
    }

    const leaveInfo = () => {
        setModaleInfoClasseRoom(false);
    }
    return (
        <div className="place-form">
            <p className="form-label">Choisir un lieu</p>

            <div className="place-form-container">

                <div className="place-form-button-container">
                    <button className="place-form-button first-select-button" onClick={showAllPlaces}>{seeClasse ? seeClasse :"Selectionnez une salle"}</button>
                    <div className="place-form-option-container">
                        {seePlace && placeAvailable.map((item, index) => (
                            <button className="place-form-button" key={index} value={item.id} onClick={() => handlePlace(item)}>{item.name}</button>
                        ))}
                        <div className="place-modale-info">
                            {seePlace && placeNotAvailable.map((item, index) => (
                                <button className="place-form-button disabled" key={index} value={item.id} onMouseEnter={()=> info(item)} onMouseLeave={leaveInfo}>{item.name}</button>
                            ))}
                            {modaleInfoClasseRoom && 
                                <div className="info-classeroom">{modaleInfoItem.event.map((item) => `Salle prise par le cours :${item}`)}</div>
                            }
                        </div>
                    </div>
                </div>
                <input type="text" className="place-adress" onChange={handleAdress} value={adress} />
            </div>
        </div>
    )
}
