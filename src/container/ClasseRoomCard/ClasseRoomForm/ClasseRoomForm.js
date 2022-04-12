import React, {useState} from 'react';

import './classeRoomForm.scss'

export default function ClasseRoomForm({data, updateToggle, updateRoom}) {

    const [name, setName] = useState(data.name);
    const [position, setPosition] = useState(data.position);
    

    const changeName = (e) => {
        setName(e.target.value);
        console.log(data)
    }

    const changePosition = (e) => {
        setPosition(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateRoom(data.id, {
            name: name,
            position: position,
        })
        updateToggle()

        // console.log(data)
    }

  return (
    <div className="class">
        <div className="classeroom-update-content">
            <form action="" onSubmit={handleSubmit}>
                <input className="classeroom-update-input" type="text" value={name} onChange={changeName} />
                <input className="classeroom-update-input" type="number" value={position} onChange={changePosition} />
                <button className="classeroom-validate">Valider</button>    
                <div className="classeroom-button-close">
                    <button className="classeroom-close" onClick={updateToggle}>x</button>
                </div>        
            </form>
        </div>

    </div>
  )
}
