import axios from 'axios';
import { api } from './apiRoute';

// export async function addTrainee (form) {
//     const response = await axios.get(`https://kanpus-api.herokuapp.com/place/trainee`, form) 
//     return response;
// };

export async function createPlace(place, token) {
    try {
        const response = await axios.post(`${api}/place`, place,
            {

                headers: {
                    authorization: `${token}`
                },
            })
        return response;
    }
    catch (err) {
        return false;
    }
};

export async function updatePlace(id, place, token) {
    try {
        const response = await axios.patch(`${api}/place/${id}`, place,
            {

                headers: {
                    authorization: `${token}`
                },
            })
        return response;
    }
    catch (err) {
        return false;
    }
};

export async function deletePlace(id, token) {
    try {
        const response = await axios.delete(`${api}/place/${id}`,
            {

                headers: {
                    authorization: `${token}`
                },
            })
        return response;
    }
    catch (err) {
        return false;
    }
};
