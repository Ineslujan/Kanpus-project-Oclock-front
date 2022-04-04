import React, { useState, useEffect } from 'react';

import AddClassesFormPart1 from '../AddClassesFormPart1/AddClassesFormPart1';

import AddClassesMenu from '../AddClassesMenu/AddClassesMenu';
import AddPlaceForm from '../AddPlaceForm/AddPlaceForm';
import AddTeachersForm from '../AddTeachersForm/AddTeachersForm';
import AddStudentsForm from '../AddStudentsForm/AddStudentsForm';
import AddTextForm from '../../container/AddTextForm/AddTextForm';

import './addClasses.scss'

export default function AddClasses() {

    const [allDatasForm, setAllDatasForm] = useState({})

    const [closeFormPart1, setCloseFormPart1] = useState(false);
    const [closeFormPart2, setCloseFormPart2] = useState(true);

    const [tabClasseRoom, setTabClasseRoom]= useState(null);
    const [classeRoom, setClasseRoom] = useState(null);

    const [teacher, setTeacher]= useState([]);
    const [tabTeachersAdded, setTabTeachersAdded] = useState([]);
    const [tabTeachers, setTabTeachers] = useState(null);

    const [tabSelectedStudents, setTabSelectedStudents] = useState([]);

    const [role, setRole] = useState("");
    const [equipment, setEquipment] = useState("");
    const [note, setNote] = useState("");

    const [validAllFormButton, setValidAllFormButton] = useState(false);

    useEffect(() => {
        if(!closeFormPart1){
            setCloseFormPart2(true)
        } else {
            setCloseFormPart2(false)
        }
    }, [closeFormPart1]);

    useEffect(() => {
        if(tabTeachersAdded.length < 1 || !classeRoom){
            setValidAllFormButton(false);
        } else {
            setValidAllFormButton(true);
        }
    }, [tabTeachersAdded, classeRoom]);
    
    const submitForm = () => {
        console.log("submit form =>")
        const tabTrainee= [];
        tabSelectedStudents.forEach(item=> {tabTrainee.push(item.id)});

        setAllDatasForm({
            ...allDatasForm,
            place_id: classeRoom, // on envoie les id
            adress: "",
            former: teacher, // on envoie les id
            trainee: tabTrainee, // on envoie les id
            role: role,
            equipment: equipment,
            note: note,
        })
        console.log(allDatasForm);
    }

  return (
    <div className="create-classes-container">
        <AddClassesFormPart1 setAllDatasForm={setAllDatasForm} setTabTeachers={setTabTeachers} setTabClasseRoom={setTabClasseRoom} closeFormPart1={closeFormPart1} setCloseFormPart1={setCloseFormPart1} />
        {!closeFormPart2 && 
            <div className="container-form-part2">
                <AddClassesMenu tabSelectedStudents={tabSelectedStudents} setTabSelectedStudents={setTabSelectedStudents} />
                <AddPlaceForm  tabClasseRoom={tabClasseRoom} classeRoom={classeRoom} setClasseRoom={setClasseRoom} />
                <AddTeachersForm tabTeachers={tabTeachers} teacher={teacher} setTeacher={setTeacher} tabTeachersAdded={tabTeachersAdded} setTabTeachersAdded={setTabTeachersAdded}  />
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
