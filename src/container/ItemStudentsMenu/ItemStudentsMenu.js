import React from 'react';
import './itemStudentsMenu.scss'

export default function ItemStudentsMenu({ showStudents, selectedStudents, tabSelectedStudents, setTabSelectedStudents }) {


    // const addAllStudent = () => {
    //     for(let i = 0; i < selectedStudents.length; i++){
    //         if(tabSelectedStudents.length > 0 ){
    //             // console.log(selectedStudents[i].id)
    //             if (tabSelectedStudents.forEach(item => item.id === selectedStudents[i].id) ){
    //                 console.log("if youhouhou")
    //                 setTabSelectedStudents([]);
    //             }
    //         }
    //     }
    //     setTabSelectedStudents([...tabSelectedStudents,
    //         ...selectedStudents])
    // }

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
