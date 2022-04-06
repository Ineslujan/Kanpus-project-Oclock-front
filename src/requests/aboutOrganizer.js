import axios from 'axios';

export async function getPlacesOrganizer() {
  try {
    const response = await axios.get('https://kanpus-api.herokuapp.com/place/');
    console.log("request PLACES",response.data);
    return response.data;
  }
  catch (err) {
    return false;
  }
}

export async function getEventsOrganizer(date) {
  try {
    const response = await axios.get(`https://kanpus-api.herokuapp.com/event/organizer/${date}`);
    console.log("request EVENTS",response.data);
    return response.data;
  }
  catch (err) {
    return false;
  }
}