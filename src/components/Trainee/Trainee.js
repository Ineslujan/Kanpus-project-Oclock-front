import React, { useContext, useState, useEffect } from 'react';
import { AuthenticationContext } from '../../context/authenticationContext';
import { requestTrainee } from '../../requests/AddClassesFormRequest';
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
    }, [selectedPromo]);

    const getStudents = async () => {
        const trainees = await requestTrainee();
        if(trainees.status === 200){
            setAllPromo(trainees.data)
            setSelectedPromo(trainees.data[0])
            // console.log('trainee=>',trainees.data)
        }
    }
    
    const setUpdate = () => {
        setSeeUpdateModal(seeUpdateModal => !seeUpdateModal);
    }
  
    return (
        <div className='trainee'> 
            <SelectedPromo selectedPromo={selectedPromo} setSelectedPromo={setSelectedPromo} allPromo={allPromo} setAllPromo={setAllPromo} getStudents={getStudents} />

                <div className="trainee-create">
                    <button className="trainer-create-button" onClick={setUpdate}>Créer un Stagiaire</button>
                    {seeUpdateModal && <UserForm seeUpdateModal={seeUpdateModal} setUpdate={setUpdate} allPromo={allPromo} getStudents={getStudents} setSeeUpdateModal={setSeeUpdateModal} /> }
                </div>
            
           
            {/* {console.log('traine=>', selectedPromo)} */}

            <div className="trainee-container">
                <div className="trainee-content">
                   
                    <div className="trainee-content-promo">
                        <div className="trainee-content-promo-title">

                        </div>
                        <div className="trainee-content-promo-students">
                            {selectedPromo && selectedPromo.trainee.map((item)=> (
                                <IdentityCard key={item.id} item={item}  setStudent={setStudent} setSelectedPromo={setSelectedPromo} setAllPromo={setAllPromo} />
                            ))}
                        </div>
                    </div>
                </div>
                
            </div>

        </div>

  )
    
}
