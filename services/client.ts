import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ['POST', 'PUT'],
    Accept: 'application/json'
  }
});

export default client;
