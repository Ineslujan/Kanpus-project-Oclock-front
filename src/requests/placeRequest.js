import axios from 'axios';
import {api} from './apiRoute';

// export async function addTrainee (form) {
//     const response = await axios.get(`https://kanpus-api.herokuapp.com/place/trainee`, form) 
//     return response;
// };

export async function createPlace (place) {
    const response = await axios.post(`${api}/place`, place) 
    return response;
};

export async function updatePlace (id, place) {
    const response = await axios.patch(`${api}/place/${id}`, place) 
    return response;
};

export async function deletePlace (id) {
    const response = await axios.delete(`${api}/place/${id}`) 
    return response;
};
