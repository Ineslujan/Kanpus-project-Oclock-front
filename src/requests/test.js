import axios from 'axios';

export async function test (token) {
    try {
        const response = await axios.get(`https://kanpus-api.herokuapp.com/test/`, 
        {

            headers: {
              authorization: `${token}`
            },
        }
        )
        return response;
    }
    catch (error) {
        console.log(error)
    }
};