import axios from 'axios';

export async function requestEvent (event) {
    const response = await axios.post(`https://kanpus-api.herokuapp.com/event/check-date`, event) 
    return response;
};

export async function requestStudents () {
    const response = await axios.get(`https://kanpus-api.herokuapp.com/user/event_form`) 
    return response;
}