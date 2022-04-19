import React, {useState, useEffect, useContext} from 'react';
import Pen from '../../assets/images/icones-bags-svg/bi-pen-fill.svg';
import Trash from '../../assets/images/icones-bags-svg/bi-trash3-fill.svg';
import { DateTime } from "luxon";
import { updatePromo, deletePromo } from '../../requests/promoRequest';
import PromoForm from '../PromoForm/PromoForm';
import { AuthenticationContext } from '../../context/authenticationContext';

export default function PromoCard({ data , getDatas}) {

    const { authentication, setAuthentication } = useContext(AuthenticationContext);
    useEffect(() => {
        console.log(data);
    }, []);

    
    const [updateView, setUpdateView] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const updateToggle = () => {
        setUpdateView(toggle => !toggle)
    }

    const deleteToggle = () => {
        setDeleteModal(toggle => !toggle)
    }

    const deleteThisPromo = async (id) => {
       const datas = await deletePromo(id, authentication.token);
        if(datas.status===200){
             getDatas();
             setDeleteModal(toggle => !toggle)
        }
    }

    const updateThisPromo = async (id, data) => {
        const datas = await updatePromo(id, data, authentication.token);
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
                        <button className="modal-icone" onClick={updateToggle}><img className="white-img" src={Pen} alt="pen"/></button> 
                        <button className="modal-icone" onClick={deleteToggle}><img className="white-img" src={Trash} alt="trash" /></button>
                    </div>
                }
                {!deleteModal?
                    <>
                        <p className="classeroom-name">{data.name}</p>
                        <p className="classeroom-position">  {DateTime.fromISO(data.created_at).year}</p>
                    </>
                :
                    <>
                        <p className="classeroom-confirmation">Voulez-vous vraiment supprimer cette salle ?</p>
                        <div className="classeroom-button-container">
                        <button className="classeroom-confirmation-button" onClick={ () => deleteThisPromo(data.id) }>oui</button>
                        <button className="classeroom-confirmation-button"  onClick={deleteToggle}>non</button></div>
                    </>
                }
            </div>
        :
            <PromoForm data={data} updateToggle={updateToggle} updateRoom={updateThisPromo} />
        }
    </div>
  )
}
