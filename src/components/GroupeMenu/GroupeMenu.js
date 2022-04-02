import React from 'react';
import './groupeMenu.scss'

export default function GroupeMenu({tabGroupe, toggleGroupes, showGroupes }) {
  return (
    <div className="groupe-container">
        <button className="groupe-title" onClick={toggleGroupes}>Groupes</button>
        {showGroupes && tabGroupe.map((item,index)=> (
                <button key={index} className="groupe">{item}</button>
        ))}
    </div>
  )
}
