import axios from 'axios'

const isTokenExpired = (token: string): boolean => {
  const decode = JSON.parse(atob(token.split('.')[1]))
  if (decode.exp * 1000 < new Date().getTime()) {
    console.log('token expired')
    return true
  } else {
    return false
  }
}

const logout = async (): Promise<void> => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  delete axios.defaults.headers.Authorization
}

export default { isTokenExpired, logout }
