import React from 'react';
import './itemStudentsMenu.scss'

export default function ItemStudentsMenu({ showStudents, selectedStudents, tabSelectedStudents, setTabSelectedStudents }) {

    const addStudent = (item) => {
        if(tabSelectedStudents.find(el => el.id === item.id)){
            console.log('if')
     
        } else {
            console.log(item)
            setTabSelectedStudents([
                ...tabSelectedStudents, 
                item
                
            ])
            console.log(tabSelectedStudents);
        }
    }
  return (
    <div className="students-menu-container">
        <button  className="studends-list-add-all">Ajoutez tous</button>
        {showStudents && selectedStudents.map((item,index)=> (
                <button key={index} className="studends-list" onClick={()=>addStudent(item)}>{item.firstname} {item.lastname}</button>
        ))}
    </div>
  )
}
