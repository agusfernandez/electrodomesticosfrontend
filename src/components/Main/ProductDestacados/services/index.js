import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getDestacados() {
    try {

        const response = await axios.get(`${baseUrl}/productos`);
        return response;

    } catch (error) {
       console.log(error);
    }
}