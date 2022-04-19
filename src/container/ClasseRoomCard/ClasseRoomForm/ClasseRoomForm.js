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
    <div className="classeroom-update">
        <div className="classeroom-update-content">
            <form className="classroom-form"action="" onSubmit={handleSubmit}>
                <input className="classeroom-update-input-text" type="text" value={name} onChange={changeName} />
                <input className="classeroom-update-input-position" type="number" value={position} onChange={changePosition} />
                    <div className="classeroom-form-buttons">
                        <button className="classeroom-validate">Valider</button>    
                        <button className="classeroom-close classeroom-close-icon" onClick={updateToggle}><img src={Close} alt="close" /></button>
                    </div>        
            </form>
        </div>

    </div>
  )
}
