import axios from 'axios'

import { setLocalStorage } from '../helpers/localstorage.helper'
import { type LoginData } from '../models'

const login = async (values: LoginData): Promise<void> => {
  const { data } = await axios.post('/usuarios-admin/login', values)
  setLocalStorage('token', data.token)
  setLocalStorage('user', data.datos)
}

export default { login }
