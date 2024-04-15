import client from './client';
import { v4 as uuidv4 } from 'uuid';

export async function customSignIn(email: string, password: string) {
  const signInParams = { email, password };

  return client.post('/users/signin', signInParams).then(res => {
    return res.data;
  });
}

export async function customRegister(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  const signUpParams = {
    _id: uuidv4(),
    firstName,
    lastName,
    email,
    password
  };
  return client.post('/users/register', signUpParams).then(res => {
    return res.data;
  });
}
