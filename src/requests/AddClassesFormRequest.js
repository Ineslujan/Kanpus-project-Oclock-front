import axios from 'axios';
import { api } from './apiRoute';

export async function requestEvent(id, event, token) {
    try {
        const response = await axios.post(`${api}/event/check_date/${id}`, event, {

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

export async function requestStudents(token) {
    try {
        const response = await axios.get(`${api}/user/event_form`, {

            headers: {
                authorization: `${token}`
            },
})
        return response;
    }
    catch (err) {
        return false;
    }
}

export async function postEvent(event, token) {
    try {
        const response = await axios.post(`${api}/event/`, event, {

            headers: {
                authorization: `${token}`
            },
})
        return response;
    }
    catch (err) {
        return false;
    }
}

export async function updateEvent(id, event, token) {
    try {
        const response = await axios.patch(`${api}/event/${id}`, event, {

            headers: {
                authorization: `${token}`
            },
})
        return response;
    }
    catch (err) {
        return false;
    }
}

export async function requestTrainee(token) {
    try {
        const response = await axios.get(`${api}/user/trainee`, {

            headers: {
                authorization: `${token}`
            },
})
        return response;
    }
    catch (err) {
        return false;
    }
}

// https://kanpus-api.herokuapp.com/user/event_form