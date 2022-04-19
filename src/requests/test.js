import axios from 'axios';
import { api } from './apiRoute';


export async function getSettings(token) {
    try {
        const response = await axios.get(`${api}/settings/`, 
        {

            headers: {
              authorization: `${token}`
            },
        }
        )
        return response;
    }
    catch (error) {
        console.log(error)
    }
};