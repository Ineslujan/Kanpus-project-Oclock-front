import React, {useState} from 'react';

import './addTeachersForm.scss'

export default function AddTeachersForm({tabTeachers, teacher, setTeacher, tabTeachersAdded, setTabTeachersAdded }) {

    const [seeTeachers, setSeeTeachers] = useState(false);

    const showAllTeachers = () => {
        setSeeTeachers(seeTeachers => !seeTeachers)
    }

    const addTeacher = (item) => {
        console.log(item.name)
        if(tabTeachersAdded.find(el=> el.name === item.name)){
     
        } else {
            setTeacher(item.name)
            setTabTeachersAdded([
                ...tabTeachersAdded, {
                    name: item.name,
                }
            ])
            console.log(tabTeachersAdded);
        }
        setSeeTeachers(false)
    }

    const removeTeacher = (value) => {
        console.log('removeTeacher');
        const teacherFiltered = tabTeachersAdded.filter(item => value.name !== item.name);
        setTabTeachersAdded(teacherFiltered);
    }

  return (
    <div className='teacher-form-container'>
        <p className="form-label">Choisir un ou des formateurs</p>

        <div className="teacher-form-select-container">
            <button className='teacher-form-select first-select-button' onClick={showAllTeachers}>{teacher}</button>
            <div className="teacher-form-option-container">
                {seeTeachers && tabTeachers.map((item,index)=> (
                    <button className="teacher-form-select" key={index} value={item} onClick={()=> addTeacher(item)} >{item.name}</button>
                ))}
            </div>
            <div className="teacher-selected-container">
                {tabTeachersAdded && tabTeachersAdded.map((item,index)=> (
                    <button className="teacher-selected" key={index} value={item} onClick={()=> removeTeacher(item)} >{item.name}</button>
                ))}
            </div>
        </div>
    </div>
  )
}
