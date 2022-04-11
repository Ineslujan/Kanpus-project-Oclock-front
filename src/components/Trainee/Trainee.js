import React, { useContext, useState, useEffect } from 'react';
import { AuthenticationContext } from '../../context/authenticationContext';
import SelectedPromo from '../../container/SelectedPromo/SelectedPromo';
import IdentityCard from '../../container/IdentityCard/IdentityCard';

import './trainee.scss'
import UserForm from '../../container/UserForm/UserForm';

export default function Trainee() {
    const { authentication } = useContext(AuthenticationContext);

    // const [tabSelectedStudents, setTabSelectedStudents] = useState([]);
    const [allPromo, setAllPromo] = useState(null);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [student, setStudent] = useState(null);
    const [seeUpdateModal, setSeeUpdateModal] = useState(false);

    useEffect(() => {
        // console.log('hiphop', selectedPromo)
    }, [selectedPromo])
    
    const setUpdate = () => {
        setSeeUpdateModal(seeUpdateModal => !seeUpdateModal);
    }
  
    return (
        <div className='trainee'> 
            <SelectedPromo selectedPromo={selectedPromo} setSelectedPromo={setSelectedPromo} allPromo={allPromo} setAllPromo={setAllPromo} />

                <div className="trainee-create">
                    <button className="trainer-create-button" onClick={setUpdate}>Créer un Stagiaire</button>
                    {seeUpdateModal && <UserForm seeUpdateModal={seeUpdateModal} setUpdate={setUpdate} /> }
                </div>
            
           
            {/* {console.log('traine=>', selectedPromo)} */}

            <div className="trainee-container">
                <div className="trainee-content">
                   
                    <div className="trainee-content-promo">
                        <div className="trainee-content-promo-title">

                        </div>
                        <div className="trainee-content-promo-students">
                            {selectedPromo && selectedPromo.trainee.map((item)=> (
                                <IdentityCard key={item.id} item={item}  setStudent={setStudent} setSelectedPromo={setSelectedPromo} />
                            ))}
                        </div>
                    </div>
                </div>
                
            </div>

        </div>

  )
    
}