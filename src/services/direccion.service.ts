import axios from 'axios'

import {
  type SelectCiudad,
  type SelectPais,
  type SelectRegion
} from '../models'

const selectPais = async (): Promise<SelectPais[]> => {
  return await axios
    .get<SelectPais[]>('/paises/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const selectRegion = async (): Promise<SelectRegion[]> => {
  return await axios
    .get<SelectRegion[]>('/regiones/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const selectCiudad = async (): Promise<SelectCiudad[]> => {
  return await axios
    .get<SelectCiudad[]>('/ciudades/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { selectPais, selectRegion, selectCiudad }
