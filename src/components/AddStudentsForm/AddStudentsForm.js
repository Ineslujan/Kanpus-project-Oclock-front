import React from 'react';
import Remove from '../../assets/images/icones-bags-svg/bi-x-square-fill.svg'
import './addStudentsForm.scss'

export default function AddStudentsForm({tabSelectedStudents, setTabSelectedStudents}) {

    const removeStudent = (value) => {
        console.log('removeStudent',value);
        const teacherFiltered = tabSelectedStudents.filter(item => value.id !== item.id);
        setTabSelectedStudents(teacherFiltered);
    }

    const removeAllStudents = () => {
        setTabSelectedStudents([]);
    }   

    return (
        <div className="students-form-container">
            <p className="form-label">Choisir un ou des éléves</p>
            {tabSelectedStudents.length > 0 ?
                <button className="remove-all-students" onClick={removeAllStudents}><img src={Remove} alt="delete" /></button>
            :   
                <p className="students-presence">Aucun élève n'est présent dans ce cours pour l'instant</p>
            }
            
            <div className="students-list-container">
              
            {tabSelectedStudents && tabSelectedStudents.map((item,index)=> (
                    <button className="teacher-form-select" key={index} value={item.user_id} onClick={()=> removeStudent(item)} >{item.firstname.slice(0,1)}. {item.lastname}</button>
            ))}
            </div>
        </div>
    )
}
