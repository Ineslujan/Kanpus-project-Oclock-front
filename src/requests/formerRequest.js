import axios from 'axios';
import { api } from './apiRoute';


export async function getFormers(token) {
    try {
        const response = await axios.get(`${api}/user/former `,
            {

                headers: {
                    authorization: `${token}`
                },
            })
        return response;
    } catch (error) {
        return error;
    }
};

export async function addFormer(form, token) {
    try {
        const response = await axios.post(`${api}/user/former `, form,
            {

                headers: {
                    authorization: `${token}`
                },
            })
        return response;
    } catch (error) {
        return error;
    }
};

export async function updateFormer(id, form, token) {
    try {
        const response = await axios.patch(`${api}/user/former/${id}`, form,
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

export async function deleteFormer(id, token) {
    try {
        const response = await axios.delete(`${api}/user/former/${id}`,
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
