import axios from 'axios';
import { api } from './apiRoute';

export async function getPlacesOrganizer(token) {
    try {
        const response = await axios.get(`${api}/place/`,
            {

                headers: {
                    authorization: `${token}`
                },
            });
        return response.data;
    }
    catch (err) {
        return false;
    }
}

//! ToCorret
export async function getEventsOrganizer(date, token) {
    return await axios.get(`${api}/event/organizer/${date}`,
        {

            headers: {
                authorization: `${token}`
            },
        });
}





