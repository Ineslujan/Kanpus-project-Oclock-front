import axios from 'axios';

export async function postConnexion (event) {
    const response = await axios.post(`https://kanpus-api.herokuapp.com/signin`, event) 
    return response;
};