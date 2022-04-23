import React, { useContext, useState} from 'react';
import { AuthenticationContext } from '../../context/authenticationContext';
import { getFormers } from '../../requests/formerRequest';
import SelectedFormers from '../SelectedFormers/SelectedFormers';
import FormerIdentity from '../FormerIdentity/FormerIdentity';
import FormerForm from '../../container/FormerForm/FormerForm';
import addItem from '../../assets/images/icones-bags-svg/BiPlusCircle.svg'

import './former.scss'

export default function Former() {
    const { authentication } = useContext(AuthenticationContext);

    const [allPromo, setAllPromo] = useState(null);
    const [selectedStatusFormer, setSelectedStatusFormer] = useState(null); 
    const [student, setStudent] = useState(null);
    const [seeUpdateModal, setSeeUpdateModal] = useState(false);

    const getStudents = async () => {
        const formers = await getFormers(authentication.token);
        if(formers.status === 200){
            setAllPromo(formers.data)
            setSelectedStatusFormer(formers.data[0])

        }
    }
    
    const setUpdate = () => {
        setSeeUpdateModal(seeUpdateModal => !seeUpdateModal);
        
    }
  
    return (
        <div className='trainee'> 
            <SelectedFormers 
                selectedStatusFormer = {selectedStatusFormer} 
                setSelectedStatusFormer = {setSelectedStatusFormer} 
                allPromo={allPromo} 
                setAllPromo={setAllPromo} 
                getStudents={getStudents} 
            />

                {/* <div className="former-create">
                    <button className="former-create-button" onClick={setUpdate}>Créer un professeur</button>
                    {seeUpdateModal && <FormerForm updateModal={seeUpdateModal} setUpdateModal={setSeeUpdateModal}  setUpdate={setUpdate} allPromo={allPromo} getStudents={getStudents} /> }
                </div> */}

            <div className="trainee-container">                 
                <div className="trainee-content-promo-students">
                    {selectedStatusFormer && selectedStatusFormer.former.map((item)=> (
                        <FormerIdentity key={item.id} item={item}  setStudent={setStudent} setSelectedPromo={setSelectedStatusFormer} setAllPromo={setAllPromo} setSeeUpdateModal={setSeeUpdateModal} getStudents={getStudents}/>
                    ))}
                </div>               
            </div>
            <div className="former-create">
                    <button className="former-create-button" onClick={setUpdate}><img className="add-item-icon" src={addItem} alt="addItem" /></button>
                    {seeUpdateModal && <FormerForm updateModal={seeUpdateModal} setUpdateModal={setSeeUpdateModal}  setUpdate={setUpdate} allPromo={allPromo} getStudents={getStudents} /> }
            </div>

        </div>

  )
    
}
