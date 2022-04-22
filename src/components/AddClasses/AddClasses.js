import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../context/authenticationContext';
import { DateTime } from "luxon";
import AddClassesFormPart1 from '../AddClassesFormPart1/AddClassesFormPart1';
import AddClassesMenu from '../AddClassesMenu/AddClassesMenu';
import AddPlaceForm from '../AddPlaceForm/AddPlaceForm';
import AddTeachersForm from '../AddTeachersForm/AddTeachersForm';
import AddStudentsForm from '../AddStudentsForm/AddStudentsForm';
import AddTextForm from '../../container/AddTextForm/AddTextForm';

import { postEvent, updateEvent, requestEvent } from '../../requests/addClassesFormRequest';
import './addClasses.scss'; 

export default function AddClasses() {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    const [allDatasForm, setAllDatasForm] = useState({})

    const [closeFormPart1, setCloseFormPart1] = useState(false);
    const [closeFormPart2, setCloseFormPart2] = useState(true);

    const [courseName, setCourseName] = useState("");

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [startTime, setStartTime] = useState('9:00');
    const [endTime, setEndTime] = useState('17:30');

    const [seeClasse, setSeeClasse] = useState("");
    const [tabClasseRoom, setTabClasseRoom]= useState(null);
    const [classeRoom, setClasseRoom] = useState(null);
    const [adress, setAdress] = useState("");

    const [teacher, setTeacher]= useState([]);
    const [tabTeachers, setTabTeachers] = useState(null);
    const [tabTeachersAdded, setTabTeachersAdded] = useState([]);

    const [eventId, setEventId] = useState(null);

    const [tabSelectedStudents, setTabSelectedStudents] = useState([]);

    const [role, setRole] = useState("");
    const [equipment, setEquipment] = useState("");
    const [note, setNote] = useState("");

    const [validAllFormButton, setValidAllFormButton] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(location.state){
            const {myData} = location.state
            // console.log("addclasse=>",myData);
            console.log("date=>", DateTime.fromJSDate(new Date(myData.start_date)).hour);
            console.log("date=>", DateTime.fromJSDate(new Date(myData.start_date)).minute);
            // console.log("addclasseTrainee",myData.trainee);
            
            setEventId(myData.event_id);
            setEquipment(myData.equipment);
            setCourseName(myData.name);
            setStartDate(new Date(myData.start_date));
            setEndDate(new Date(myData.end_date));
            setStartTime(`${DateTime.fromJSDate(new Date(myData.start_date)).toUTC().hour}:${DateTime.fromJSDate(new Date(myData.start_date)).minute}${DateTime.fromJSDate(new Date(myData.start_date)).minute === 0 ? "0" : ""}`);
            setEndTime(`${DateTime.fromJSDate(new Date(myData.end_date)).toUTC().hour}:${DateTime.fromJSDate(new Date(myData.end_date)).minute}`);
            setRole(myData.role);
            setNote(myData.note);

            const getDatas = async () => {
                // console.log('je passe ici', myData.former);
                const datas = await requestEvent(myData.event_id, {
                    name: myData.name,
                    start_date: new Date(myData.start_date),
                    end_date: new Date(myData.end_date),
                }, authentication.token);
                if(datas.status === 200){
                    setTabTeachers(datas.data.former);
                    setTabClasseRoom(datas.data.place);
                    setSeeClasse(myData.place_name);
                    setAllDatasForm({
                        name: myData.name,
                        start_date: new Date(myData.start_date),
                        end_date: new Date(myData.end_date),
                    })

                    myData.former.forEach(element => {
                        teacher.push(element.id);
                        tabTeachersAdded.push({
                            event: [null],
                            firstname: element.firstname,
                            lastname: element.lastname,
                            user_id: element.id
                        })
                    });

                    setTabTeachersAdded(tabTeachersAdded);
                    setTeacher(teacher);
                    setClasseRoom(myData.place_id);
                    setTabSelectedStudents(myData.trainee);
                    setCloseFormPart1(true);
                }
            } 
            getDatas();
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

    const closePart1= () => {
        setCloseFormPart1(false);
        setTabTeachersAdded([]);
        setClasseRoom(null);
        setTeacher([]);
    }


    
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
                }, authentication.token);
                if(datas.status === 200){
                    navigate("/organizer");
                }
            } 
            getDatas();  
        }  else {
            const getDatas = async () => {
                // console.log('POOOOOSSSST',classeRoom, "postTeacher=>", teacher, "postTabTrainne=>",tabTrainee, "postAllform=>" ,allDatasForm)
                const datas = await updateEvent(eventId,{
                    ...allDatasForm,
                    place_id: classeRoom, 
                    address: adress,
                    former: teacher, 
                    trainee: tabTrainee, 
                    role: role,
                    equipment: equipment,
                    note: note,
                }, authentication.token);
                if(datas.status === 200){
                    navigate("/organizer");
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
            closePart1={closePart1}
        />
        {!closeFormPart2 && 
            <div className="container-form-part2">
                <AddClassesMenu tabSelectedStudents={tabSelectedStudents} setTabSelectedStudents={setTabSelectedStudents} />
                <AddPlaceForm  tabClasseRoom={tabClasseRoom} classeRoom={classeRoom} setClasseRoom={setClasseRoom} setAdress={setAdress} seeClasse={seeClasse} setSeeClasse={setSeeClasse} />
                <AddTeachersForm tabTeachers={tabTeachers} teacher={teacher} setTeacher={setTeacher} tabTeachersAdded={tabTeachersAdded} setTabTeachersAdded={setTabTeachersAdded} />
                <AddStudentsForm tabSelectedStudents={tabSelectedStudents} setTabSelectedStudents={setTabSelectedStudents} />
                <AddTextForm text={"Rôles"} set={setRole} value={role} />
                <AddTextForm text={"Matériel"} set={setEquipment} value={equipment} />
                <AddTextForm text={"Infos pratique"} set={setNote} value={note} />
                {validAllFormButton ? <button className="date-form-button" onClick={submitForm}>Valider</button> : <button className="date-form-button" onClick={submitForm} disabled>Valider</button>}
            </div>
        }
    </div>
  )
}
