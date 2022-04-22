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

export async function putSettings(settings, token) {
    try {
        const response = await axios.put(`${api}/settings/`, settings, 
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

//display only, all users authorized
export async function allUsersSettings() {
    try {
        const response = await axios.get(`${api}/signin/`)
        return response;
    }
    catch (error) {
        console.log(error)
    }
};