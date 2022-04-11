import axios from 'axios';

// export async function addTrainee (form) {
//     const response = await axios.get(`https://kanpus-api.herokuapp.com/place/trainee`, form) 
//     return response;
// };

export async function updatePlace (id, place) {
    const response = await axios.patch(`https://kanpus-api.herokuapp.com/place/${id}`, place) 
    return response;
};

export async function deletePlace (id) {
    const response = await axios.delete(`https://kanpus-api.herokuapp.com/place/${id}`) 
    return response;
};
