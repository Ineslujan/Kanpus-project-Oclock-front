import axios from 'axios';

export async function addTrainee (form) {
    const response = await axios.post(`https://kanpus-api.herokuapp.com/user/trainee`, form) 
    return response;
};

export async function deleteUser (id) {
    const response = await axios.delete(`https://kanpus-api.herokuapp.com/user/trainee/${id}`) 
    return response;
};

export async function getAllPromo () {
    const response = await axios.get(`https://kanpus-api.herokuapp.com/promo/`) 
    return response;
};