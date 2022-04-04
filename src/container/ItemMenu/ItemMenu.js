import React from 'react';
import './itemMenu.scss'

export default function ItemMenu({text, classN, tab, toggle, show }) {
  return (
    <div className="groupe-container">
        <button className={classN} onClick={toggle}>{text}</button>
        {show && tab.map((item,index)=> (
                <button key={index} className="groupe">{item}</button>
        ))}
    </div>
  )
}
