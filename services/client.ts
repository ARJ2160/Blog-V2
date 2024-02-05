import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    ContentType: 'application/json',
    AccessControlAllowOrigin: '*',
    AccessControlAllowMethods: ['POST', 'PUT'],
    Accept: 'application/json'
  }
});

export default client;
