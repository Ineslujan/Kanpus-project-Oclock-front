import axios from 'axios';
import { api } from './apiRoute';

export async function uploadPic(picture, token) {
    try {
        const response = await axios.post(`${api}/upload/`, picture,
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