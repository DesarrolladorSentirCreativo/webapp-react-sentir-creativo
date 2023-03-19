const isTokenExpired = (token: string): boolean => {
  const decode = JSON.parse(atob(token.split('.')[1]))
  if (decode.exp * 1000 < new Date().getTime()) {
    console.log('token expired')
    return true
  } else {
    return false
  }
}

export default { isTokenExpired }
