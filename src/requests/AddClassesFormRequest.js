import axios from 'axios';

export async function requestEvent (event) {
    const response = await axios.post(`https://kanpus-api.herokuapp.com/event/check-date`, event) 
    return response;
};

export async function requestStudents () {
    const response = await axios.get(`https://kanpus-api.herokuapp.com/user/event_form`) 
    return response;
}

export async function postEvent (event) {
    const response = await axios.post(`https://kanpus-api.herokuapp.com/event`, event) 
    return response;
}

export async function requestTrainee () {
    const response = await axios.get(`https://kanpus-api.herokuapp.com/user/trainee`) 
    return response;
}                                                                                               

// https://kanpus-api.herokuapp.com/user/event_form