import React, {useState, useEffect, useContext} from 'react';

import { requestStudents } from '../../requests/addClassesFormRequest';

import ItemMenu from '../../container/ItemMenu/ItemMenu';
import ItemStudentsMenu from '../../container/ItemStudentsMenu/ItemStudentsMenu';
import { AuthenticationContext } from '../../context/authenticationContext';

import './addClassesMenu.scss'

export default function AddClassesMenu({tabSelectedStudents, setTabSelectedStudents}) {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    const [showPromos, setShowPromos] = useState(false);
    const [showStudents, setShowStudents] = useState(false);

    const [tabPromos, setTabPromos] = useState([]);

    const [selectedStudents, setSelectedStudents] = useState(false);

    console.log(showStudents);

    useEffect(() => {
        const getStudents = async () => {
            const students = await requestStudents(authentication.token);
            if(students.status === 200){
                setTabPromos(students.data.promos);
            }
        }
        getStudents()
    }, [])
    

    const togglePromos = () => {
        setShowPromos(showPromos => !showPromos);
        if(showStudents){
            setShowStudents(false);
        }
    };

    const onClickOutside = () => {
        setShowStudents(false);
    }



  return (

    <div className="menu">
        <div className='menu-container'>
            <div className="menu-items">
                
                <ItemMenu 
                    text={"Promos"} 
                    classN={"promo-title"} 
                    tab={tabPromos} 
                    toggle={togglePromos} 
                    show={showPromos}
                    setSelectedStudents={setSelectedStudents}
                    selectedStudents={selectedStudents}
                    setShowStudents={setShowStudents} 
                    showStudents={showStudents} 
                />
            
        
                {selectedStudents && showStudents &&
                    <ItemStudentsMenu 
                        showStudents={showStudents} 
                        selectedStudents={selectedStudents} 
                        tabSelectedStudents={tabSelectedStudents} 
                        setTabSelectedStudents={setTabSelectedStudents} 
                        onClickOutside={onClickOutside}  />
                } 
            </div>
        </div>
    </div>

  )
}

