import axios from './axios';

export const getHours = async (day) => 
  await axios.get(`/tasks/home/${day}`)

export const getTasks = async (title, day, page = 1) => 
  await axios.get(`/tasks/${title}/${day}/${page}`)

export const saveTask = async (body) => 
  await axios.post('/task', body)

export const deleteTask = async (id) =>  
  await axios.delete(`/task/${id}`)