import axios from 'axios';
import {api} from './apiRoute';

export async function addPromo (form) {
    const response = await axios.post(`${api}/promo/ `, form) 
    return response;
};

export async function updatePromo(id, form) {
    try{
        const response = await axios.patch(`${api}/promo/${id}`, form) 
    return response;
    } catch (error) {
        console.log(error)
    }
    
}; 

export async function deletePromo (id) {
    const response = await axios.delete(`${api}/promo/${id}`) 
    return response;
};
