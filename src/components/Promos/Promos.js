import React, {useState, useEffect, useContext} from 'react';
import { getPlacesOrganizer } from '../../requests/aboutOrganizer';
import ClasseRoomCard from '../../container/ClasseRoomCard/ClasseRoomCard';
import ClasseRoomAdd from '../ClasseRoomAdd/ClasseRoomAdd';
import { AuthenticationContext } from '../../context/authenticationContext';

import './classeRoom.scss'

export default function ClasseRoom() {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    const [allPlaces, setAllPlaces] = useState(null);
    const [createModal, setCreateModal] = useState(false);

        const getDatas = async () => {
        const trainees = await requestTrainee(authentication.token);
        if(trainees.status === 200){
            setAllPromo(trainees.data)
            setSelectedPromo(trainees.data[0])

        }
    }

    // const getDatas = async () => {
    //     const datas = await getPlacesOrganizer(authentication.token);
    //         setAllPlaces(datas);
    //         console.log(allPlaces)
    // }
 
    useEffect(() => {
        getDatas();
    }, [])

    const toggleCreateModal = () => {
        setCreateModal(modal => !modal)
    }

 
    
    
    return (
        <div className="classeroom">
            <div className="classeroom-container">
                {createModal && <ClasseRoomAdd createModal={createModal}  toggleCreateModal={toggleCreateModal} getDatas={getDatas} allPlaces={allPlaces} setAllPlaces={setAllPlaces} />}
                
                <div className="classeroom-create">
                    <p className="classeroom-title">Lieux</p>
                    <button className="classeroom-create-button" onClick={toggleCreateModal} >Créer une salle</button>
                </div>
                <div className="classeroom-content">
                    {allPlaces &&  allPlaces.map((item) => (
                            <ClasseRoomCard key={item.id} data={item} getDatas={getDatas} />
                    ))}
                </div>

            </div>
        </div>
  )
}





























































































































































// import React, { useContext, useState, useEffect } from 'react';
// import { AuthenticationContext } from '../../context/authenticationContext';
// import { requestTrainee } from '../../requests/addClassesFormRequest';
// import SelectedPromo from '../../container/SelectedPromo/SelectedPromo';
// import IdentityCard from '../../container/IdentityCard/IdentityCard';
// import PromoCreate from '../PromoCreate/PromoCreate';
// import { updatePromo, deletePromo } from '../../requests/promoRequest';

// import Pen from '../../public/images/pen.png'

// import './promos.scss'


// export default function Promos() {
//     const { authentication } = useContext(AuthenticationContext);

//     const [allPromo, setAllPromo] = useState(null);
//     const [selectedPromo, setSelectedPromo] = useState(null);
//     const [student, setStudent] = useState(null);
//     const [seeUpdateModal, setSeeUpdateModal] = useState(false);
//     const [seeUpdateInput, setSeeUpdateInput] = useState(false);
//     const [updateInput, setUpdateInput] = useState("")

//     const getStudents = async () => {
//         const trainees = await requestTrainee(authentication.token);
//         if(trainees.status === 200){
//             setAllPromo(trainees.data)
//             setSelectedPromo(trainees.data[0])

//         }
//     }
    
//     const setUpdate = () => {
//         setSeeUpdateModal(seeUpdateModal => !seeUpdateModal);
        
//     }

//     const updateButton = () => {
//         console.log('youhou');
//         setSeeUpdateInput(true);
//     }

//     const changeUpdateInput = (e) => {
//         setUpdateInput(e.target.value);
//     }

//     const deletePromo = async () => {
//         // const promo = await deletePromo(selectedPromo.trainee[0].promo_id, authentication.token);
//         if(promo.status === 200){
//            console.log('ca marche on efface une promo promo');
//            setSeeUpdateInput(false);
//         }
//     }

//     const onSubmitPromo = (e) => {
//         e.preventDefault()
//         console.log(selectedPromo.trainee[0].promo_id);
//         const update = async () => {
//             const promo = await updatePromo(selectedPromo.trainee[0].promo_id, {
//                 name: updateInput,
//             }, authentication.token);
//             if(promo.status === 200){
//                console.log('ca marche lupdate promo');
//                setSeeUpdateInput(false);
//             }
//         }
//         update();
//     }
  
//     return (
//         <div className='trainee'> 
//             <div className="promos">
//                 {!seeUpdateInput ?
//                 <>
//                     <SelectedPromo selectedPromo={selectedPromo} setSelectedPromo={setSelectedPromo} allPromo={allPromo} setAllPromo={setAllPromo} getStudents={getStudents} />
//                     <button onClick={updateButton}> <img src={Pen} alt="pen" /></button>
//                 </>
//                 :
//                 <>
//                     <div className="promos-update">
//                         <form className="promos-update-form" onSubmit={onSubmitPromo}>
//                             <input type="text" className="promos-update-input" placeholder={selectedPromo.promo} value={updateInput} onChange={changeUpdateInput} /> <button>Valider</button>
//                         </form>
//                     </div>
//                     <div className="promo-delete">
//                         <button onClick={deletePromo}>Supprimez la promo {selectedPromo.promo}</button>
//                     </div>
//                 </>

//                 }
//             </div>

//                 <div className="trainee-create">
//                     <button className="trainer-create-button" onClick={setUpdate}>Créer une Promo</button>
//                     {seeUpdateModal && <PromoCreate updateModal={seeUpdateModal} setUpdateModal={setSeeUpdateModal}  setUpdate={setUpdate} allPromo={allPromo} getStudents={getStudents} /> }
//                 </div>

//             <div className="trainee-container">
//                 <div className="trainee-content">
                   
//                     <div className="trainee-content-promo">
//                         <div className="trainee-content-promo-title">

//                         </div>
//                         <div className="trainee-content-promo-students">
//                             {selectedPromo && selectedPromo.trainee.map((item)=> (
//                                 <IdentityCard key={item.id} item={item}  setStudent={setStudent} setSelectedPromo={setSelectedPromo} setAllPromo={setAllPromo} setSeeUpdateModal={setSeeUpdateModal} getStudents={getStudents}/>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
                
//             </div>

//         </div>

//   )
    
// }
