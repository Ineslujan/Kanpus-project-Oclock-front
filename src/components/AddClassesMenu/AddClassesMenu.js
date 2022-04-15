import React, {useState, useEffect, useContext} from 'react';

import { requestStudents } from '../../requests/addClassesFormRequest';

import ItemMenu from '../../container/ItemMenu/ItemMenu';
import ItemStudentsMenu from '../../container/ItemStudentsMenu/ItemStudentsMenu';
import { AuthenticationContext } from '../../context/authenticationContext';

import './addClassesMenu.scss'

export default function AddClassesMenu({tabSelectedStudents, setTabSelectedStudents}) {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    const [showPromos, setShowPromos] = useState(false);
    const [showGroupes, setShowGroupes] = useState(false);
    const [showStudents, setShowStudents] = useState(false);

    const [tabPromos, setTabPromos] = useState([]);
    const [tabGroupes, setTabGroupes] = useState([]);

    const [selectedStudents, setSelectedStudents] = useState(false);

    useEffect(() => {
        const getStudents = async () => {
            const students = await requestStudents(authentication.token);
            if(students.status === 200){
                setTabPromos(students.data.promos);
                setTabGroupes(students.data.group)
            }
        }
        getStudents()
    }, [])
    

    const togglePromos = () => {
        setShowPromos(showPromos => !showPromos);
        // console.log(showGroupes)
        if (showGroupes){
            setShowGroupes(false);
        } 
    };

    const toggleGroupes = () => {
        setShowGroupes(showGroupes => !showGroupes);
        if (showPromos){
            setShowPromos(false);
        }
    };


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
                    setShowStudents={setShowStudents}  
                />
                <ItemMenu 
                    text={"Groupes"} 
                    classN={"groupe-title"} 
                    tab={tabGroupes} 
                    toggle={toggleGroupes} 
                    show={showGroupes} 
                    setSelectedStudents={setSelectedStudents}
                    setShowStudents={setShowStudents} 
                />
            </div>  
            {selectedStudents && <ItemStudentsMenu showStudents={showStudents} selectedStudents={selectedStudents} tabSelectedStudents={tabSelectedStudents} setTabSelectedStudents={setTabSelectedStudents}/>} 
        </div>
     
    </div>

  )
}

