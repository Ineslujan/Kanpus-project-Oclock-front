import React, {useState} from 'react';
import FormerIdentityModal from '../FormerIdentityModal/FormerIdentityModal';


import './formerIdentity.scss'

export default function FormerIdentity({ item, setAllPromo, setSelectedPromo, setSeeUpdateModal, getStudents }) {

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
            <div className="identity-picture" onClick={openIdentityModal}>
                {console.log(item)}
                <img src={item.image} alt="" />
            </div>
            <div className="identity-name">
            <h5>{item.firstname} {item.lastname} </h5>
            </div>
            {modalIsOpen && <FormerIdentityModal 
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
