import axios from 'axios';
import { api } from './apiRoute';

export async function updateAdminPassword(password, token, id) {
    try {
        const response = await axios.patch(`${api}user/password/admin/${id}`, password,{

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