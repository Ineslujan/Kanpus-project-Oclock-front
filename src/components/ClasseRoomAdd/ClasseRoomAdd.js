import React, {useState, useEffect, useContext} from 'react';
import Modal from 'react-modal';
import './classeRoomAdd.scss';
import { createPlace } from '../../requests/placeRequest'
import { AuthenticationContext } from '../../context/authenticationContext';
import svgCircle from '../../assets/images/icones-bags-svg/bi-x-square-fill.svg';

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
        });
        setNewPosition(Math.max(...newArrayPosition ) + 1);
        setAllPositionNotAvailable(newArrayPosition);
        setAllNameNotAvailable(allName);
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
                }
            }
            postPlace();

        }
    }

    return (
        <Modal 
        isOpen={createModal}
        className='Modal'
        overlayClassName='Overlay'
        > 
      
            <div className="modal-button-close">
                <button className="close" onClick={toggleCreateModal}><img src={svgCircle} alt="close-icon" /></button>
            </div>
            <div className="classeroom-add-container">
                <form className="classeroom-add-form" onSubmit={onSubmit}>
                    <div className="classeroom-form-wrapper">
                        <div className="classeroom-form">
                            
                            <label htmlFor="classeroom-name" className="classeroom-form-label">Nom :</label>
                            <input type="text" className="classeroom-form-input" value={name} onChange={changeName} /> 
                            {nameError && <p className="classeroom-form-error">Ce nom est déjà attribué à une autre salle</p>}
                      
                        
                            <label htmlFor="classeroom-name" className="classeroom-form-label"  >Position :</label>
                            <input type="number" className="classeroom-form-input" value={newPosition} onChange={changePosition} /> 
                            {positionError && <p className="classeroom-form-error">Cette position est déjà occupé par une autre salle</p>}
                       
                            <div className="modal-confirmation-response-block">
                                <button className="modal-confirmation-response">valider</button>
                            </div>
                        </div>
                    </div>
                </form>
                

            </div>
        </Modal>
    )
}
