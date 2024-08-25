import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

export async function sendQueryToOpenAI(prompt) {
  try {
    const response = await axios.post(`${apiUrl}`,{prompt}, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data.response;
  } catch (error) {
    console.error('Error while calling backend API:', error);
  }
}
