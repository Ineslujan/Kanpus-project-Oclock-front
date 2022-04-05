import React from 'react';
import './addStudentsForm.scss'

export default function AddStudentsForm({tabSelectedStudents, setTabSelectedStudents}) {

    const removeStudent = (value) => {
        // console.log('removeStudent');
        const teacherFiltered = tabSelectedStudents.filter(item => value.id !== item.id);
        setTabSelectedStudents(teacherFiltered);
    }

    return (
        <div className="students-form-container">
            <p className="form-label">Choisir un ou des éléves</p>
            <div className="students-list-container">
            {tabSelectedStudents && tabSelectedStudents.map((item,index)=> (
                    <button className="teacher-form-select" key={index} value={item.user_id} onClick={()=> removeStudent(item)} >{item.firtname}{item.lastname}</button>
            ))}
            </div>
        </div>
    )
}
