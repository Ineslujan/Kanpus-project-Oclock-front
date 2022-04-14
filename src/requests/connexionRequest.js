import axios from 'axios';
import {api} from './apiRoute';

export async function postConnexion (event) {
    const response = await axios.post(`${api}/signin`, event) 
    return response;
};