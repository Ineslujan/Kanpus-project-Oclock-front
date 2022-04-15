import axios from 'axios';
import { api } from './apiRoute';

export async function requestMyCourse(page, token) {
    try {
        const response = await axios.get(`${api}/event/my_course/${page}`,
            {

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

export async function deleteCourse(id, token) {
    try {
        const response = await axios.delete(`${api}/event/${id}`,
            {

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


