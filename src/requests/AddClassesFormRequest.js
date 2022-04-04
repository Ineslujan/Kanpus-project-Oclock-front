import axios from 'axios';

export async function requestEvent (event) {
    const response = await axios.post(`https://kanpus-api.herokuapp.com/event/check-date`, event) 
    return response;
};
