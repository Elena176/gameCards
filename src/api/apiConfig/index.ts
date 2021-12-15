import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL; // Достаем базовый юрл из .env(ссылка на хироку)

export const instance = axios.create({
  baseURL: baseUrl /* "http://localhost:7542/2.0/" */,
  withCredentials: true, // браузер разбирайся с куками сам
});
