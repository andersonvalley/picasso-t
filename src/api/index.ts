import axios, {AxiosInstance} from 'axios'

export const instance: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})
