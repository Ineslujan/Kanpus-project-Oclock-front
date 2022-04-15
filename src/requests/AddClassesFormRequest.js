import axios from 'axios';
import {api} from './apiRoute';

export async function requestEvent (id, event) {
    const response = await axios.post(`${api}/event/check_date/${id}`, event) 
    return response;
};

export async function requestStudents () {
    const response = await axios.get(`${api}/user/event_form`) 
    return response;
}

export async function postEvent (event) {
    const response = await axios.post(`${api}/event/`, event) 
    return response;
}

export async function updateEvent (id, event) {
    const response = await axios.patch(`${api}/event/${id}`, event) 
    return response;
}

export async function requestTrainee () {
    const response = await axios.get(`${api}/user/trainee`) 
    return response;
}                                                                                               

// https://kanpus-api.herokuapp.com/user/event_form