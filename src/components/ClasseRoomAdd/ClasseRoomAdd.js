import React, {useState, useEffect, useContext} from 'react';
import Modal from 'react-modal';
import './classeRoomAdd.scss';
import { createPlace } from '../../requests/placeRequest'
import { AuthenticationContext } from '../../context/authenticationContext';

export default function ClasseRoomAdd({ createModal, toggleCreateModal, getDatas, allPlaces }) {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    Modal.setAppElement(document.getElementById('root'));

    const [name, setName] = useState("");
    const [allPositionNotAvailable, setAllPositionNotAvailable] = useState([]);
    const [allNameNotAvailable, setAllNameNotAvailable] = useState([]);
    const [newPosition, setNewPosition] = useState(5);
    const [positionError, setPositionError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const pushAllPosition = () => {
        const newArrayPosition = [];
        const allName = [];
        allPlaces.forEach(element => {
            newArrayPosition.push(element.position);
            allName.push(element.name)
            console.log(allPositionNotAvailable);
        });
        setNewPosition(Math.max(...newArrayPosition ) + 1);
        setAllPositionNotAvailable(newArrayPosition);
        setAllNameNotAvailable(allName);
        console.log("newPos=>",newPosition, allName);
    }

    useEffect(() => {
        getDatas();
        pushAllPosition();
    }, []);
    

    useEffect(() => {
        setAllPositionNotAvailable([])
        pushAllPosition();
    }, [allPlaces]);

    const changePosition = (e) => {
        setNewPosition(e.target.value);
    }

    const changeName = (e) => {
        setName(e.target.value);
    }
    
    const onSubmit = e =>  {
        e.preventDefault();
        // console.log("submit",allPositionNotAvailable, "new=>", newPosition);
        if(allPositionNotAvailable.includes(Number(newPosition))){
            setPositionError(true);
            setTimeout(() => {
                setPositionError(false)
            }, 5000);
        } else if (allNameNotAvailable.includes(name)){
            setNameError(true);
            setTimeout(() => {
                setNameError(false)
            }, 5000);
        } else {
            const postPlace = async () => {
                const datas = await createPlace({
                  name: name,
                  position: Number(newPosition)
                }, authentication.token);
                if(datas.status === 200){
                    toggleCreateModal();
                    getDatas();
                    console.log("place", name, newPosition );
                }
            }
            postPlace();

        }
    }

    return (
        <Modal isOpen={createModal}> 
      
            <div className="modal-button-close">
                <button className="close" onClick={toggleCreateModal}>x</button>
            </div>
            <div className="classeroom-add-container">
                <form className="classeroom-add-form" onSubmit={onSubmit}>
                    <div className="classeroom-form">
                        <label htmlFor="classeroom-name" className="classeroom-form-label">Nom :</label>
                        <input type="text" className="classeroom-form-input" value={name} onChange={changeName} required/> 
                        {nameError && <p className="classeroom-form-error">Ce nom est déjà attribué à une autre salle</p>}
                    </div>
                    <div className="classeroom-form">
                        <label htmlFor="classeroom-name" className="classeroom-form-label"  >Position :</label>
                        <input type="number" className="classeroom-form-input" value={newPosition} onChange={changePosition} required/> 
                        {positionError && <p className="classeroom-form-error">Cette position est déjà occupé par une autre salle</p>}
                        
                        <button>valider</button>
                    </div>
                </form>
                

            </div>
        </Modal>
    )
}
