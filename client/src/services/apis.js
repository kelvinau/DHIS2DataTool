import axios from 'axios';

const URL =
  process.env.NODE_ENV === 'production' ?
  process.env.REACT_APP_PROD_API_URL :
  process.env.REACT_APP_DEV_API_URL;

const client = axios.create({
  baseURL: `${URL}api`,
});

export const authorize = (credentials) => {
  return client.post('/authorize', credentials);
};