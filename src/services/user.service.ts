import axios from 'axios'

import { type LoginData } from '../models'

const login = async (values: LoginData): Promise<void> => {
  const { data } = await axios.post('/userAdmin', values)
  localStorage.setItem('token', data.token)
}

export default { login }
