import axios from 'axios';

const api = axios.create({
  baseURL: 'http://'+process.env.HOST+':'+process.env.PORT
});

export default api;