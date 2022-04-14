import axios from 'axios';
import {api} from './apiRoute';


export async function getFormers (form) {
    try {
    const response = await axios.get(`${api}/user/former `) 
    return response;
    } catch (error) {
        return error;
    }
};

export async function addFormer (form) {
    try {
    const response = await axios.post(`${api}/user/former `, form) 
    return response;
    } catch (error) {
        return error;
    }
};

export async function updateFormer(id, form) {
    try{
        const response = await axios.patch(`${api}/user/former/${id}`, form) 
    return response;
    } catch (error) {
        console.log(error)
    }
    
};

export async function deleteFormer (id) {
    const response = await axios.delete(`${api}/user/former/${id}`) 
    return response;
};
