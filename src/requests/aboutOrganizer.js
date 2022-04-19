import axios from 'axios';
import { api } from './apiRoute';

export async function getPlacesOrganizer(token) {
    try {
        const response = await axios.get(`${api}/place`,
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

export async function getEventsOrganizer(date, token) {
    try {
        const response = await axios.get(`${api}/event/organizer/${date}`,
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

export async function getSettings(token) {
    try {
        const response = await axios.get(`${api}/settings`,
            {

                headers: {
                    authorization: `${token}`
                },
            });
        return response.data;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}



