import axios from 'axios';
import {api} from './apiRoute';

export async function addTrainee (form) {
    const response = await axios.post(`${api}/user/trainee`, form) 
    return response;
};

export async function updateTrainee(id, form) {
    try{
        const response = await axios.patch(`${api}/user/trainee/${id}`, form) 
    return response;
    } catch (error) {
        console.log(error)
    }
    
};

export async function deleteUser (id) {
    const response = await axios.delete(`${api}/user/trainee/${id}`) 
    return response;
};

export async function getAllPromo () {
    const response = await axios.get(`${api}/promo/`) 
    return response;
};