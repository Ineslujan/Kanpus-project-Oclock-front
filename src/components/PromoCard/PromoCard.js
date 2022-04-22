import React, {useState, useEffect, useContext} from 'react';
import Pencil from '../../assets/images/icones-bags-svg/bi-pencil-fill.svg';
import Trash from '../../assets/images/icones-bags-svg/bi-trash3-fill.svg';
import { DateTime } from "luxon";
import { updatePromo, deletePromo } from '../../requests/promoRequest';
import PromoForm from '../PromoForm/PromoForm';
import { AuthenticationContext } from '../../context/authenticationContext';

import './promoCard.scss';

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
    <div className="promo-card">
        {!updateView ?
            <div className="promo-info">
                {!deleteModal &&
                    <div className="promo-button">
                        <button className="modal-icone-pencil" onClick={updateToggle}><img className="img-pencil" src={Pencil} alt="pen"/></button> 
                        <button className="modal-icone-trash" onClick={deleteToggle}><img className="img-trash" src={Trash} alt="trash" /></button>
                    </div>
                }
                {!deleteModal?
                    <>
                        <p className="promo-name">{data.name}</p>
                        <p className="promo-position">  {DateTime.fromISO(data.created_at).year}</p>
                    </>
                :
                    <>
                        <p className="promo-confirmation">Voulez-vous supprimer cette promo ?</p>
                        <div className="promo-button-container">
                        <button className="promo-confirmation-validate-button" onClick={ () => deleteThisPromo(data.id) }>Oui</button>
                        <button className="promo-confirmation-cancel-button"  onClick={deleteToggle}>Non</button></div>
                    </>
                }
            </div>
        :
            <PromoForm data={data} updateToggle={updateToggle} updateRoom={updateThisPromo} />
        }
    </div>
  )
}
