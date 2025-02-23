// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',  // Replace with your actual base API URL
});

export default instance;
