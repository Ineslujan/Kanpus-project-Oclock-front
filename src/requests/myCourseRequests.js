import axios from 'axios';
import {api} from './apiRoute';

export async function requestMyCourse (page) {
    const response = await axios.get(`${api}/event/my_course/${page}`) 
    return response;
};

export async function deleteCourse (id) {
    const response = await axios.delete(`${api}/event/${id}`) 
    return response;
};


