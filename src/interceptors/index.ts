import axios from 'axios'

import authService from '../services/auth.service'

axios.defaults.baseURL = 'https://localhost:5293/api/v1'

// axios.defaults.baseURL = 'https://api.sentircreativo.com/api/v1'

const token = localStorage.getItem('token')

axios.defaults.headers.Authorization =
  token && !authService.isTokenExpired(token)
    ? `Bearer ${token.replace(/['"]+/g, '')}`
    : null

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ERR_CANCELED') {
      return
    }
    if (error.response.status === 401) {
      // window.location.replace("/login");
      console.log('error 401')
    }
    return await Promise.reject(error)
  }
)
