import React from 'react';
import './itemStudentsMenu.scss'

export default function ItemStudentsMenu({ showStudents, selectedStudents, tabSelectedStudents, setTabSelectedStudents }) {


    const addStudent = (item) => {
        if(tabSelectedStudents.find(el => el.id === item.id)){
     
        } else {
            console.log(item)
            setTabSelectedStudents([
                ...tabSelectedStudents, 
                item
            ])
        }
    }

    const addAllStudents = () => {
        setTabSelectedStudents(selectedStudents);
    }

    
  return (
    <div className="students-menu-container">
        <button  className="studends-list-add-all" onClick={addAllStudents}>Ajoutez tous</button>
        {selectedStudents.map((item,index)=> ( 
        
                <button key={index} className="studends-list" onClick={()=>addStudent(item)}>{item.firstname} {item.lastname}</button>
            
        ))}
    </div>
  )
}
