import React from 'react';



import './itemMenu.scss'

export default function ItemMenu({text, classN, tab, toggle, show, setSelectedStudents, setShowStudents }) {

  const selectStudents = (item) => {
    setShowStudents(false)
    console.log(item.trainee);
    setSelectedStudents(item.trainee);
    setShowStudents(true);
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
