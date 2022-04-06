import React from 'react';
import Modal from 'react-modal';

export default function MyCourseModal({modalIsOpen, openModal, datas}) {

    Modal.setAppElement(document.getElementById('root'));
  return (
    <Modal
    isOpen={modalIsOpen}
    // onRequestClose={closeModal}
    // style={customStyles}
    contentLabel="Example Modal"
    >   
        <div className="modal-course-info">
            <button className="close" onClick={openModal} >x</button>
            <div className="course-info">
            <p className="name">{datas.name}</p>
            <p className="startdate">{datas.start_date}</p>
            <p className="enddate">{datas.end_date}</p>
            </div>
            
        </div>
    </Modal>

  )
}
