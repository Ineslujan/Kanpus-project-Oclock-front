import axios from 'axios';

export async function getPlacesOrganizer() {
    try {
        const response = await axios.get(`https://kanpus-api.herokuapp.com/place/`);
        return response.data;
    }
    catch (err) {
        return false;
    }
}

export async function getEventsOrganizer(date) {
    return await axios.get(`https://kanpus-api.herokuapp.com/event/organizer/${date}`);
}





