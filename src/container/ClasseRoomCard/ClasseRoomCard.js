import React, {useState, useContext} from 'react';
import ClasseRoomForm from './ClasseRoomForm/ClasseRoomForm';
import Pencil from '../../assets/images/icones-bags-svg/bi-pencil-fill.svg';
import Trash from '../../assets/images/icones-bags-svg/bi-trash3-fill.svg';
import { updatePlace, deletePlace } from '../../requests/placeRequest';
import { AuthenticationContext } from '../../context/authenticationContext';

import './classeRoomCard.scss';

export default function ClasseRoomCard({ data, getDatas }) {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    const [updateView, setUpdateView] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const updateToggle = () => {
        setUpdateView(toggle => !toggle)
    }

    const deleteToggle = () => {
        setDeleteModal(toggle => !toggle)
    }

    const deleteRoom = async (id) => {
       const datas = await deletePlace(id, authentication.token);
        if(datas.status===200){
             getDatas();
        }
    }

    const updateRoom = async (id, data) => {
        const datas = await updatePlace(id, data, authentication.token);
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
                        <button className="modal-icone-pencil" onClick={updateToggle}><img className ="img-pencil" src={Pencil} alt="pen"/></button> 
                        <button className="modal-icone-trash" onClick={deleteToggle}><img className ="img-trash" src={Trash} alt="trash" /></button>
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
                        <button className="classeroom-confirmation-validate-button" onClick={ () => deleteRoom(data.id) }>Oui</button>
                        <button className="classeroom-confirmation-cancel-button"  onClick={deleteToggle}>Non</button></div>
                    </>
                }
            </div>
        :
            <ClasseRoomForm data={data} updateToggle={updateToggle} updateRoom={updateRoom} />
        }
    </div>
  )
}
