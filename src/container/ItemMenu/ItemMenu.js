import React from 'react';



import './itemMenu.scss'

export default function ItemMenu({text, classN, tab, toggle, show, setSelectedStudents, selectedStudents, setShowStudents, showStudents }) {

  const selectStudents = (item) => {
    // setShowStudents(false);
    console.log(item.trainee);
    setSelectedStudents(item.trainee);

    if(selectedStudents === item.trainee){
      setShowStudents(student => !student);
    } else if (!showStudents) {
      setShowStudents(student => !student);
    }
  }
  return (
    <div className="groupe-container">
       <button className={classN} onClick={toggle}>{text}</button>
        {show && tab.map((item,index)=> (
                <button key={index} className="groupe" onClick={()=> selectStudents(item)}>{item.name}</button>
        ))}
        
    </div>
  )
}
