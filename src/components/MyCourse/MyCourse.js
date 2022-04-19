import React, {useState, useEffect, useContext} from 'react';
import CourseCard from '../../container/CourseCard/CourseCard';
import { requestMyCourse } from '../../requests/myCourseRequests';
import { AuthenticationContext } from '../../context/authenticationContext';


import './myCourse.scss';

export default function MyCourse() {
    const { authentication, setAuthentication } = useContext(AuthenticationContext);

    const [allCourses, setAllCourses] = useState();
    const [seeCourse, setSeeCourse] = useState(false);
    const [paging, setPaging] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);


    const openModal = () => {
        setModalIsOpen(!modalIsOpen);
        console.log("modalOpen");
    }



    useEffect(() => {
        const getDatas = async () => {
            const datas = await requestMyCourse(paging, authentication.token);
            if(datas.status === 200){
                setAllCourses(datas.data)
                console.log(datas.data)
            }
        } 
        getDatas();
    }, []);

    useEffect(() => {
     if(allCourses){
         setSeeCourse(true);
     } else {
         setSeeCourse(false);
     }
    }, [allCourses]);

    const addCourse = () => {
        setPaging(paging => paging + 1);

        const getDatas = async () => {
            const datas = await requestMyCourse(paging+1, authentication.token);
            if(datas.status === 200){
                setAllCourses([...allCourses,
                    ...datas.data])
                console.log(datas.data)
            }
        } 
        getDatas();

        console.log(paging)
    }

    
    

    return (
        <div className="mycourse">
          
                    {seeCourse && allCourses.map((item) => (
                        <CourseCard key={item.event_id} datas={item} openModal={openModal} modalIsOpen={modalIsOpen} setAllCourses={setAllCourses} />
                    ))}
            
                    <button className="pagination-mycourse-button" onClick={addCourse}>Voir la suite des cours</button>
          
        </div>
    )
}
