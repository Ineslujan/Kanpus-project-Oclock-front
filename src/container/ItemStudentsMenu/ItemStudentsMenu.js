import React, {useEffect ,useRef} from 'react';
import './itemStudentsMenu.scss'

export default function ItemStudentsMenu({ showStudents, selectedStudents, tabSelectedStudents, setTabSelectedStudents, onClickOutside }) {

    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside && onClickOutside();
            console.log("clic")
          }
        };
            document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
      }, [ onClickOutside ]);
    
      if(!showStudents)
        return null;

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
    <div ref={ref} className="students-menu-container">
        <button  className="studends-list-add-all" onClick={addAllStudents}>Ajoutez tous</button>
        {selectedStudents.map((item,index)=> ( 
        
                <button key={index} className="studends-list" onClick={()=>addStudent(item)}>{item.firstname} {item.lastname}</button>
            
        ))}
    </div>
  )
}
