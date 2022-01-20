import axios from './axios';

export const getUser = async () => 
  await axios.get('/user');

export const upload = async () => 
  await axios.post('/upload')

export const updateUser = async (id, body) =>
  await axios.put(`/user/${id}`, body)