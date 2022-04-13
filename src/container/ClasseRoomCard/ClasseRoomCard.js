import React, {useState} from 'react';
import ClasseRoomForm from './ClasseRoomForm/ClasseRoomForm';
import Pen from '../../public/images/pen.png';
import Trash from '../../public/images/trash.png';
import { updatePlace, deletePlace } from '../../requests/placeRequest';
import { getPlacesOrganizer } from '../../requests/aboutOrganizer';

import './classeRoomCard.scss';

export default function ClasseRoomCard({ data, getDatas }) {
    const [updateView, setUpdateView] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const updateToggle = () => {
        setUpdateView(toggle => !toggle)
    }

    const deleteToggle = () => {
        setDeleteModal(toggle => !toggle)
    }

    const deleteRoom = async (id) => {
       const datas = await deletePlace(id);
        if(datas.status===200){
             getDatas();
        }
    }

    const updateRoom = async (id, data) => {
        const datas = await updatePlace(id, data);
        if(datas.status===200){
            getDatas();
        }
    }

  return (
    <div className="classeroom-card">
        {!updateView ?
            <div className="classeroom-info">
                {!deleteModal &&
                    <div className="classeroom-button">
                        <button className="modal-icone" onClick={updateToggle}><img src={Pen} alt="pen"/></button> 
                        <button className="modal-icone" onClick={deleteToggle}><img src={Trash} alt="trash" /></button>
                    </div>
                }
                {!deleteModal?
                    <>
                        <p className="classeroom-name">{data.name}</p>
                        <p className="classeroom-position">{data.position}</p>
                    </>
                :
                    <>
                        <p className="classeroom-confirmation">Voulez-vous vraiment supprimer cette salle ?</p>
                        <div className="classeroom-button-container">
                        <button className="classeroom-confirmation-button" onClick={ ()=> deleteRoom(data.id) }>oui</button>
                        <button className="classeroom-confirmation-button"  onClick={deleteToggle}>non</button></div>
                    </>
                }
            </div>
        :
            <ClasseRoomForm data={data} updateToggle={updateToggle} updateRoom={updateRoom} />
        }
    </div>
  )
}
