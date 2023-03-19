import axios from 'axios'

import { type LoginData } from '../models'

const login = async (values: LoginData): Promise<void> => {
  const { data } = await axios.post('users/login', values)
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', data.user)
}

export default { login }
