import React, {useState, useEffect} from 'react';
import { requestEvent } from '../../requests/AddClassesFormRequest';
import './addTeachersForm.scss'

export default function AddTeachersForm({event, teacher, setTeacher, tabTeachersAdded, setTabTeachersAdded }) {

    const [seeTeachers, setSeeTeachers] = useState(false);

    const [tabTeachers, setTabTeachers] = useState(null);

    useEffect(() => {
        const getDatas = async () => {
            const datas = await requestEvent(event);
            if(datas.status === 200){
                setTabTeachers(datas.data.former);
                console.log("setTeachers", datas, tabTeachers);
            }
        } 
        getDatas();
    }, [])
    

    const showAllTeachers = () => {
        setSeeTeachers(seeTeachers => !seeTeachers)
    }

    const addTeacher = (item) => {
        if(tabTeachersAdded.find(el=> el.user_id === item.user_id)){
     
        } else {
            setTeacher(item.user_id)
            console.log(item)
            setTabTeachersAdded([
                ...tabTeachersAdded, 
                item
                
            ])
            console.log(tabTeachersAdded);
        }
        setSeeTeachers(false)
    }

    const removeTeacher = (value) => {
        console.log('removeTeacher');
        const teacherFiltered = tabTeachersAdded.filter(item => value.user_id !== item.user_id);
        setTabTeachersAdded(teacherFiltered);
    }

  return (
    <div className='teacher-form-container'>
        <p className="form-label">Choisir un ou des formateurs</p>

        <div className="teacher-form-select-container">
            <button className='teacher-form-select first-select-button' onClick={showAllTeachers}>Selectionnez un formateur</button>
            <div className="teacher-form-option-container">
                {seeTeachers && tabTeachers.map((item,index)=> (
                    <button className="teacher-form-select" key={index} value={item.user_id} onClick={()=> addTeacher(item)} >{item.firtname}{item.lastname}</button>
                ))}
            </div>
            <div className="teacher-selected-container">
                {tabTeachersAdded && tabTeachersAdded.map((item,index)=> (
                    <button className="teacher-selected" key={index} value={item.user_id} onClick={()=> removeTeacher(item)} >{item.firtname}{item.lastname}</button>
                ))}
            </div>
        </div>
    </div>
  )
}
