import React, { useContext, useState, useEffect } from 'react';
import { AuthenticationContext } from '../../context/authenticationContext';
import SelectedPromo from '../../container/SelectedPromo/SelectedPromo';
import IdentityCard from '../../container/IdentityCard/IdentityCard';

import './trainee.scss'

export default function Trainee() {
    const { authentication } = useContext(AuthenticationContext);

    // const [tabSelectedStudents, setTabSelectedStudents] = useState([]);

    const [selectedPromo, setSelectedPromo] = useState(null)
    const [student, setStudent] = useState(null)

    useEffect(() => {
        // console.log('hiphop', selectedPromo)
    }, [selectedPromo])
    

  
    return (
        <div className='trainee'>
            <SelectedPromo selectedPromo={selectedPromo} setSelectedPromo={setSelectedPromo}  />
           
            {/* {console.log('traine=>', selectedPromo)} */}

            <div className="trainee-container">
                <div className="trainee-content">
                    <div className="trainee-content-promo">
                        <div className="trainee-content-promo-title">

                        </div>
                        <div className="trainee-content-promo-students">
                            {selectedPromo && selectedPromo.trainee.map((item,index)=> (
                                <IdentityCard key={item.id} item={item}  setStudent={setStudent} />
                            ))}
                        </div>
                    </div>
                </div>
                
            </div>

        </div>

  )
    
}