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
        const datas = await getPlacesOrganizer(authentication.token);
            setAllPlaces(datas);
            console.log(allPlaces)
    }
 
    useEffect(() => {
        getDatas();
    }, [])

    const toggleCreateModal = () => {
        setCreateModal(modal => !modal)
    }

 
    
    
    return (
        <div className="classeroom">
            <p className="classeroom-title">Lieux</p>
            <div className="classeroom-container">
                {createModal && <ClasseRoomAdd createModal={createModal}  toggleCreateModal={toggleCreateModal} getDatas={getDatas} allPlaces={allPlaces} setAllPlaces={setAllPlaces} />}
                
                <div className="classeroom-create">
                    {/* <p className="classeroom-title">Lieux</p> */}
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
