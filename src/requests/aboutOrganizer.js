import axios from 'axios';
import {api} from './apiRoute';

export async function getPlacesOrganizer() {
    try {
        const response = await axios.get(`${api}/place/`);
        return response.data;
    }
    catch (err) {
        return false;
    }
}

export async function getEventsOrganizer(date) {
    return await axios.get(`${api}/event/organizer/${date}`);
}





