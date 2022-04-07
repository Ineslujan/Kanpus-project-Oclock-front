import axios from 'axios';

export async function postConnexion (event) {
    const response = await axios.post(`http://romain-deldon.vpnuser.lan:3000/signin`, event) 
    return response;
};