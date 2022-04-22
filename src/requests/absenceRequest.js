import axios from 'axios';
import { api } from './apiRoute';


export async function getAbsences(id,token) {
    try {
        const response = await axios.get(`${api}/absence/${id}`, 
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


export async function addAbsences(id, absence, token) {
    try {
        const response = await axios.patch(`${api}/absence/${id}`, absence, 
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