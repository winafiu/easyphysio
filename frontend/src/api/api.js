import axios from 'axios'

const Api = axios.create({
  baseURL: 'http://localhost:3500',
  timeout: 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export { Api }
