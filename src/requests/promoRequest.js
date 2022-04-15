import axios from 'axios';
import { api } from './apiRoute';

export async function addPromo(form, token) {
    try {
        const response = await axios.post(`${api}/promo/ `, form,
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

export async function updatePromo(id, form, token) {
    try {
        const response = await axios.patch(`${api}/promo/${id}`, form,
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

export async function deletePromo(id, token) {
    try {
        const response = await axios.delete(`${api}/promo/${id}`,
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
