import axios from 'axios';
import LoginResponse from '../models/LoginResponse';

const autoLogin = async function() {
  const response = await axios.get(
    'http://localhost:5001/',
    { withCredentials: true }
  );
  return <LoginResponse>response.data;
};

const processLogin = async function(username: string, password: string) {
  const response = await axios.post(
    'http://localhost:5001/login',
    {
      username: username,
      password: password
    },
    { withCredentials: true }
  );

  return <LoginResponse>response.data;
};

const createUser = async function(username: string, password: string) {
  const response = await axios.post('http://localhost:5001/signup', {
    username: username,
    password: password
  });

  return <string>response.data;
};

const logoutUser = async function(userId: string) {
  await axios.post('http://localhost:5001/logout', {
     userId: userId
  },
  { withCredentials: true });
  return;
};

export { processLogin, createUser, autoLogin, logoutUser };
