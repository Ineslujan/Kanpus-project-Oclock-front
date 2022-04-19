import { Info } from 'luxon';
import React, { useState, useEffect } from 'react';
import { set } from 'react-hook-form';
import './addTeachersForm.scss';

export default function AddTeachersForm({ tabTeachers, teacher, setTeacher, tabTeachersAdded, setTabTeachersAdded }) {
  const [seeTeachers, setSeeTeachers] = useState(false);
  
  const [teacherAvailable, setTeacherNoEvent] = useState([]);
  const [teacherNotAvailable, setTeacherNotAvailable] = useState([]);

  
  const [modaleInfoTeacher, setModaleInfoTeacher] = useState(false);
  const [modaleInfo, setModaleInfo] = useState()


  useEffect(() => {
    setTeacherNoEvent(tabTeachers.filter((item) => item.event[0] === null));
    console.log('teacherEvent1=>');
    setTeacherNotAvailable(tabTeachers.filter((item) => item.event[0] !== null));
    console.log('teacherEvent2=>');
  }, [tabTeachers]);

  useEffect(() => {
//     if(tabTeachersAdded.length > 0) {

//         tabTeachersAdded.array.forEach(element => {
//             setTeacher([
//                 ...teacher,
//                 element.user_id,
//                 ]);
//         });
        
//     }
  console.log('useEffect', tabTeachersAdded, teacher);
  }, [])
  

  const showAllTeachers = () => {
    setSeeTeachers(( seeTeachers ) => !seeTeachers);
    // console.log(tabTeachers);
  };

  const addTeacher = (item) => {

    console.log("tabAdded", tabTeachersAdded, item, teacher);
    if (tabTeachersAdded.find((el) => el.user_id === item.user_id)) {

    } else {
      setTeacher([
        ...teacher,
        item.user_id,
      ]);
      console.log('else',item);
      setTabTeachersAdded([
        ...tabTeachersAdded,
        item,

      ]);
      console.log('teacherAdd2=>',tabTeachersAdded);
    }
    setSeeTeachers(false);
  };

  const removeTeacher = (value) => {
    // console.log('removeTeacher');
    const teacherFiltered = tabTeachersAdded.filter((item) => value.user_id !== item.user_id);
    setTabTeachersAdded(teacherFiltered);
    const idFiltered = teacher.filter((item) => value.user_id !== item);
    setTeacher(idFiltered);
  };

  const info = (item) => {
    setModaleInfoTeacher(true);
    setModaleInfo(item);
    // console.log(item)
}

const leaveInfo = () => {
    setModaleInfoTeacher(false);
}

  return (
    <div className="teacher-form-container">
      <p className="form-label">Choisir un ou des formateurs</p>

      <div className="teacher-form-select-container">
        <button className="teacher-form-select first-select-button" onClick={showAllTeachers}>Selectionnez un formateur</button>
        <div className="teacher-form-option-container">
            {seeTeachers && teacherAvailable.map((item, index) => (
                <button className="teacher-form-select" key={index} value={item.user_id} onClick={() => addTeacher(item)}>{item.firstname}  {item.lastname}</button>
            ))}
             {seeTeachers && teacherNotAvailable.map((item, index) => (
                <button className="teacher-form-select-disabled" key={index} value={item.user_id} onMouseEnter={()=> info(item)} onMouseLeave={leaveInfo}>{item.firstname}  {item.lastname}</button>
                ))}
                {modaleInfoTeacher && <div className="info-teacher">{modaleInfo.event.map((item) => item)}</div>}
        </div>
        <div className="teacher-selected-container">
            {tabTeachersAdded && tabTeachersAdded.map((item, index) => (
                <button className="teacher-selected" key={index} value={item.user_id} onClick={() => removeTeacher(item)}>{item.firstname}  {item.lastname}</button>
            ))}
        </div>
      </div>
    </div>
  );
}
