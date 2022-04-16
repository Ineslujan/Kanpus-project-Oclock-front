import React, {useState} from 'react';
import Close from '../../../assets/images/icones-bags-svg/bi-x-square-fill.svg';
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
            position: Number(position),
        })
        updateToggle()
    }

  return (
    <div className="class">
        <div className="classeroom-update-content">
            <form action="" onSubmit={handleSubmit}>
                <input className="classeroom-update-input-text" type="text" value={name} onChange={changeName} />
                <input className="classeroom-update-input-position" type="number" value={position} onChange={changePosition} />
                <button className="classeroom-validate">Valider</button>    
                <div className="classeroom-button-close">
                    <button className="classeroom-close" onClick={updateToggle}><img src={Close} alt="close" class="classeroom-close-icon" /></button>
                </div>        
            </form>
        </div>

    </div>
  )
}
