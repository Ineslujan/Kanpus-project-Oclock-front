import React, { useState, useEffect } from 'react';
import './addTeachersForm.scss';

export default function AddTeachersForm({ tabTeachers, teacher, setTeacher }) {
  const [seeTeachers, setSeeTeachers] = useState(false);
  const [tabTeachersAdded, setTabTeachersAdded] = useState([]);

  useEffect(() => {
    const teacherNoEvent = tabTeachersAdded.filter((item) => item.event[0] === null);
    console.log(teacherNoEvent);
    const teacherEvent = tabTeachersAdded.filter((item) => item.event[0] !== null);
    console.log('teacherEvent=>', teacherEvent);
  }, [tabTeachers]);

  const showAllTeachers = () => {
    setSeeTeachers(( seeTeachers ) => !seeTeachers);
    console.log(tabTeachers);
  };

  const addTeacher = (item) => {
    if (tabTeachersAdded.find((el) => el.user_id === item.user_id)) {

    } else {
      setTeacher([
        ...teacher,
        item.user_id,
      ]);
      console.log(item);
      setTabTeachersAdded([
        ...tabTeachersAdded,
        item,

      ]);
      console.log(tabTeachersAdded);
    }
    setSeeTeachers(false);
  };

  const removeTeacher = (value) => {
    console.log('removeTeacher');
    const teacherFiltered = tabTeachersAdded.filter((item) => value.user_id !== item.user_id);
    setTabTeachersAdded(teacherFiltered);
    const idFiltered = teacher.filter((item) => value.user_id !== item);
    setTeacher(idFiltered);
  };

  return (
    <div className="teacher-form-container">
      <p className="form-label">Choisir un ou des formateurs</p>

      <div className="teacher-form-select-container">
        <button className="teacher-form-select first-select-button" onClick={showAllTeachers}>Selectionnez un formateur</button>
        <div className="teacher-form-option-container">
          {seeTeachers && tabTeachers.map((item, index) => (
            <button className="teacher-form-select" key={index} value={item.user_id} onClick={() => addTeacher(item)}>{item.firtname}{item.lastname}</button>
          ))}
        </div>
        <div className="teacher-selected-container">
          {tabTeachersAdded && tabTeachersAdded.map((item, index) => (
            <button className="teacher-selected" key={index} value={item.user_id} onClick={() => removeTeacher(item)}>{item.firtname}{item.lastname}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
