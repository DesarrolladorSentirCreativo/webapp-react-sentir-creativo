import axios from 'axios'

import {
  type ICreateSucursal,
  type ISelectSucursal,
  type ISucursalDataGrid,
  type IUpdateSucursal
} from '../models/sucursal'

const getAll = async (): Promise<ISucursalDataGrid[]> => {
  return await axios
    .get<ISucursalDataGrid[]>('/sucursales')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/sucursales/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const create = async (values: ICreateSucursal): Promise<number | null> => {
  return await axios
    .post<number>('/sucursales', values)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return null
    })
}

const getById = async (id: number): Promise<IUpdateSucursal> => {
  return await axios
    .get<IUpdateSucursal>(`/sucursales/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (values: IUpdateSucursal): Promise<void> => {
  const { data } = await axios.put('/sucursales', values)
  return data
}

const select = async (): Promise<ISelectSucursal[]> => {
  return await axios
    .get<ISelectSucursal[]>('/sucursales/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { getAll, deleteById, create, getById, update, select }
