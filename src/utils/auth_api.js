import axios from 'axios'
import apis from '../constants/apis'
import { AsyncStorage } from "react-native";

const authApi = axios.create({
  baseURL: apis.API_ROOT_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

authApi.interceptors.request.use(
  async config => {
    if (!config.withoutAuth) {
      const token = await AsyncStorage.getItem('token')
      config.headers.Authorization = `Bearer ${token}`
    }
   
    return config
  },
  error => {
    return Promise.reject(error.response)
  },
)

authApi.interceptors.response.use(
  response => {
    return response.data
  },
  async error => {
    return Promise.reject(error.response)
  },
)

export default authApi
