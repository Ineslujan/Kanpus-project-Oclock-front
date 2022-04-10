import React, { useContext, useState, useEffect } from 'react';
import { AuthenticationContext } from '../../context/authenticationContext';
import PromoAndGroupMenu from '../../container/PromoAndGroupMenu/PromoAndGroupMenu';

export default function Trainee() {
    const { authentication } = useContext(AuthenticationContext);

 
    const [tabSelectedStudents, setTabSelectedStudents] = useState([]);

  

    const [selectedStudents, setSelectedStudents] = useState(false);

  
    return (
       <div>
           <PromoAndGroupMenu />

       </div>

  )
    
}