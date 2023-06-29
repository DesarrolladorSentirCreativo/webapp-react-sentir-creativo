import axios from 'axios'

import { setLocalStorage } from '../helpers/localstorage.helper'
import { type LoginData } from '../models'

const login = async (values: LoginData): Promise<void> => {
  const { data } = await axios.post('/usuarios-admin/login', values)
  axios.defaults.headers.Authorization = `Bearer ${data.token}`
  setLocalStorage('token', data.token)
  setLocalStorage('user', data.datos)
}

const logout = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  delete axios.defaults.headers.Authorization
}

const isTokenExpired = (token: any): boolean => {
  const decode = JSON.parse(atob(token.split('.')[1]))
  if (decode.exp * 1000 < new Date().getTime()) {
    console.log('token expired')
    logout()
    return true
  } else {
    return false
  }
}

export default { login, logout, isTokenExpired }
