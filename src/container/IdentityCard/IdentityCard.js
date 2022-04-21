import React, {useState} from 'react';
import IdentityModal from '../IdentityModal/IdentityModal';

import './identityCard.scss'

export default function IdentityCard({item, setAllPromo, setSelectedPromo, setSeeUpdateModal, getStudents}) {

    const [modalIsOpen, setModalIsOpen] = useState(false);


    const closeIdentityModal = () => {
        setModalIsOpen(false);
    }

    const openIdentityModal = () => {
        setModalIsOpen(true);
    }

    return (
        <div>
        <div className="identity" >
            <div className="identity-container-picture">
                <div className="identity-picture" onClick={openIdentityModal}>
                    {console.log(item)}
                    <img src={item.image} alt="" />
                </div>
            </div>
            <div className="identity-container-name">
                <div className="identity-name">
                <h5>{item.firstname} {item.lastname} </h5>
                </div>
            </div>
            {modalIsOpen && <IdentityModal 
                item={item} 
                modalIsOpen={modalIsOpen} 
                closeIdentityModal={closeIdentityModal} 
                setAllPromo={setAllPromo} 
                setSelectedPromo={setSelectedPromo} 
                setSeeUpdateModal={setSeeUpdateModal}
                getStudents={getStudents}
            /> }
        </div>
        </div>
    )
}
