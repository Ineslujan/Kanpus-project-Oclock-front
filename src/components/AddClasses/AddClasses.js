import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import AddClassesFormPart1 from '../AddClassesFormPart1/AddClassesFormPart1';
import AddClassesMenu from '../AddClassesMenu/AddClassesMenu';
import AddPlaceForm from '../AddPlaceForm/AddPlaceForm';
import AddTeachersForm from '../AddTeachersForm/AddTeachersForm';
import AddStudentsForm from '../AddStudentsForm/AddStudentsForm';
import AddTextForm from '../../container/AddTextForm/AddTextForm';

import { postEvent, updateEvent } from '../../requests/AddClassesFormRequest';
import './addClasses.scss'; 

export default function AddClasses() {

    const [allDatasForm, setAllDatasForm] = useState({})

    const [closeFormPart1, setCloseFormPart1] = useState(false);
    const [closeFormPart2, setCloseFormPart2] = useState(true);

    const [courseName, setCourseName] = useState("");

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [startTime, setStartTime] = useState('9:00');
    const [endTime, setEndTime] = useState('17:30');

    const [tabClasseRoom, setTabClasseRoom]= useState(null);
    const [classeRoom, setClasseRoom] = useState(null);
    const [adress, setAdress] = useState("");

    const [teacher, setTeacher]= useState([]);
    const [tabTeachers, setTabTeachers] = useState(null);

    const [eventId, setEventId] = useState(null);

    const [tabSelectedStudents, setTabSelectedStudents] = useState([]);

    const [role, setRole] = useState("");
    const [equipment, setEquipment] = useState("");
    const [note, setNote] = useState("");

    const [validAllFormButton, setValidAllFormButton] = useState(false);

    const [editDatas, setEditDatas] = useState(null)

    const location = useLocation();

    useEffect(() => {
        if(location.state){
            const {myData} = location.state
            console.log("addclasse=>",myData);
            console.log(new Date(myData.start_date));
            
            setEventId(myData.event_id)
            setEditDatas(myData);
            setEquipment(myData.equipment);
            setCourseName(myData.name);
            setStartDate(new Date(myData.start_date));
            setEndDate(new Date(myData.end_date));
            setTeacher(myData.former);
            setTabSelectedStudents(myData.trainee);
            setRole(myData.role);
            setNote(myData.note)
        }
    }, [])


    useEffect(() => {
        if(!closeFormPart1){
            // console.log("classeroom",classeRoom);
            setCloseFormPart2(true);
            // reset teacher and place state when we back in first page form
            setTeacher([]);
            setClasseRoom(undefined);
        } else {
            setCloseFormPart2(false);
        }
    }, [closeFormPart1]);

    useEffect(() => {
        if(teacher.length < 1 || !classeRoom){
            setValidAllFormButton(false);
        } else {
            setValidAllFormButton(true);
        }
    }, [teacher, classeRoom]);


    
    const submitForm = () => {
        
        const tabTrainee= [];
        tabSelectedStudents.forEach(item=> {tabTrainee.push(item.id)});
        // console.log("submit form =>", tabSelectedStudents)
        if(!eventId) {

            const getDatas = async () => {
                const datas = await postEvent({
                    ...allDatasForm,
                    place_id: classeRoom, 
                    address: adress,
                    former: teacher, 
                    trainee: tabTrainee, 
                    role: role,
                    equipment: equipment,
                    note: note,
                });
                if(datas.status === 200){
                    setAllDatasForm({
                        ...allDatasForm,
                        place_id: classeRoom, 
                        address: adress,
                        former: teacher, 
                        trainee: tabTrainee, 
                        role: role,
                        equipment: equipment,
                        note: note,
                    })
                }
            } 
            getDatas();  
        }  else {
            const getDatas = async () => {
                const datas = await updateEvent(eventId,{
                    ...allDatasForm,
                    place_id: classeRoom, 
                    address: adress,
                    former: teacher, 
                    trainee: tabTrainee, 
                    role: role,
                    equipment: equipment,
                    note: note,
                });
                if(datas.status === 200){
                    setAllDatasForm({
                        ...allDatasForm,
                        place_id: classeRoom, 
                        address: adress,
                        former: teacher, 
                        trainee: tabTrainee, 
                        role: role,
                        equipment: equipment,
                        note: note,
                    })
                }
            } 
            getDatas();  
        } 
        console.log(allDatasForm);
    }

  return (
    <div className="create-classes-container">
        <AddClassesFormPart1 
            setAllDatasForm = {setAllDatasForm} 
            setTabTeachers = {setTabTeachers} 
            setTabClasseRoom = {setTabClasseRoom} 
            closeFormPart1 = {closeFormPart1} 
            setCloseFormPart1 = {setCloseFormPart1}
            startDate = {startDate}
            setStartDate = {setStartDate}
            endDate = {endDate}
            setEndDate = {setEndDate}
            startTime = {startTime} 
            setStartTime = {setStartTime}
            endTime = {endTime}
            setEndTime = {setEndTime}
            courseName = {courseName}
            setCourseName = {setCourseName}
            eventId = {eventId}
        />
        {!closeFormPart2 && 
            <div className="container-form-part2">
                <AddClassesMenu tabSelectedStudents={tabSelectedStudents} setTabSelectedStudents={setTabSelectedStudents} />
                <AddPlaceForm  tabClasseRoom={tabClasseRoom} classeRoom={classeRoom} setClasseRoom={setClasseRoom} setAdress={setAdress} />
                <AddTeachersForm tabTeachers={tabTeachers} teacher={teacher} setTeacher={setTeacher}  />
                <AddStudentsForm tabSelectedStudents={tabSelectedStudents} setTabSelectedStudents={setTabSelectedStudents} />
                <AddTextForm text={"Rôles"} set={setRole} value={role} />
                <AddTextForm text={"Matériel"} set={setEquipment} value={equipment}/>
                <AddTextForm text={"Infos pratique"} set={setNote} value={note}/>
                {validAllFormButton ? <button className="date-form-button" onClick={submitForm}>Valider</button> : <button className="date-form-button" onClick={submitForm} disabled>Valider</button>}
            </div>
        }
    </div>
  )
}
