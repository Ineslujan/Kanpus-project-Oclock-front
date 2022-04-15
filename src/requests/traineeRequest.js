import axios from 'axios';
import { api } from './apiRoute';

export async function addTrainee(form, token) {
    try {
        const response = await axios.post(`${api}/user/trainee`, form,
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

export async function updateTrainee(id, form, token) {
    try {
        const response = await axios.patch(`${api}/user/trainee/${id}`, form,
            {

                headers: {
                    authorization: `${token}`
                },
            })
        return response;
    } catch (error) {
        console.log(error)
    }

};

export async function deleteUser(id, token) {
    try {
        const response = await axios.delete(`${api}/user/trainee/${id}`,
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

export async function getAllPromo(token) {
    try {
        const response = await axios.get(`${api}/promo/`,
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