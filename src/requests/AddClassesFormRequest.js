import axios from 'axios';

export async function requestEvent (id, event) {
    const response = await axios.post(`https://kanpus-api.herokuapp.com/event/check_date/${id}`, event) 
    return response;
};

export async function requestStudents () {
    const response = await axios.get(`https://kanpus-api.herokuapp.com/user/event_form`) 
    return response;
}

export async function postEvent (event) {
    const response = await axios.post(`https://kanpus-api.herokuapp.com/event/`, event) 
    return response;
}

export async function updateEvent (id, event) {
    const response = await axios.patch(`https://kanpus-api.herokuapp.com/event/${id}`, event) 
    return response;
}

export async function requestTrainee () {
    const response = await axios.get(`https://kanpus-api.herokuapp.com/user/trainee`) 
    return response;
}                                                                                               

// https://kanpus-api.herokuapp.com/user/event_form