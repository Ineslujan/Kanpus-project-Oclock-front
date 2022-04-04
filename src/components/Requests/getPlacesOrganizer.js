import axios from 'axios';

export async function getPlacesOrganizer() {
  try {
    // avec Axios, les string template ne sont pas obligatoires :
    // const response = await axios.get(`https://api.github.com/search/repositories?q=${searchValue}&sort=${stars}&order=${desc}&page=${page}&per_page=${perPage}`);
    const response = await axios.get('https://kanpus-api.herokuapp.com/place/');
    console.log(response.data);
    return response.data;
  }
  catch (err) {
    return false;
  }
}