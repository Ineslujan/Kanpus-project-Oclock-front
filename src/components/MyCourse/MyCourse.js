import React, {useState, useEffect} from 'react';
import CourseCard from '../../container/CourseCard/CourseCard';
import { requestMyCourse } from '../../requests/myCourseRequests';

import './myCourse.scss';

export default function MyCourse() {

    const [allCourses, setAllCourses] = useState();
    const [seeCourse, setSeeCourse] = useState(false);
    const [paging, setPaging] = useState(1)

    useEffect(() => {
        const getDatas = async () => {
            const datas = await requestMyCourse(paging);
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
            const datas = await requestMyCourse(paging+1);
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
                    <CourseCard key={item.event_id} datas={item} />
                ))}
           
            <button className="button" onClick={addCourse}>Voir la suite des cours</button>
            
        </div>
    )
}
