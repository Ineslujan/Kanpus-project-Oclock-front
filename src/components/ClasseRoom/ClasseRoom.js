import React, {useState, useEffect} from 'react';
import { getPlacesOrganizer } from '../../requests/aboutOrganizer';
import ClasseRoomCard from '../../container/ClasseRoomCard/ClasseRoomCard';


import './classeRoom.scss'



export default function ClasseRoom() {

    const [allPlaces, setAllPlaces] = useState(null);

    useEffect(() => {
        const getDatas = async () => {
            const datas = await getPlacesOrganizer();
                setAllPlaces(datas);
                console.log(allPlaces)
        }
        getDatas();
    }, [])

 
    
    
    return (
        <div className="classeroom">
            <div className="classeroom-container">
                <div className="classeroom-create">
                    <p className="classeroom-title">Lieux</p>
                    <button className="classeroom-create-button">Créer une salle</button>
                </div>
                <div className="classeroom-content">
                    {allPlaces &&  allPlaces.map((item) => (
                            <ClasseRoomCard key={item.id} data={item} setAllPlaces={setAllPlaces} />
                    ))}
                </div>

            </div>
        </div>
  )
}
