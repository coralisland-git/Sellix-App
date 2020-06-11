import axios from 'axios'
import apis from '../constants/apis'

const api = axios.create({
  baseURL:  apis.API_ROOT_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error.response)
  },
)

export default api