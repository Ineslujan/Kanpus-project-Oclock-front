import axios from 'axios';

export async function requestMyCourse (page) {
    const response = await axios.get(`https://kanpus-api.herokuapp.com/event/my_course/${page}`) 
    return response;
};