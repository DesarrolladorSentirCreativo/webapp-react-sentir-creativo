import axios from 'axios'

import {
  type ICreateEstadoServicio,
  type IEstadoServicio,
  type ISelectEstadoServicio,
  type IUpdateEstadoServicio
} from '../models'

const getAll = async (): Promise<IEstadoServicio[]> => {
  return await axios
    .get<IEstadoServicio[]>('/estados-servicios')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/estados-servicios/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const create = async (
  values: ICreateEstadoServicio,
  userId: number
): Promise<void> => {
  const data = {
    ...values,
    userId
  }
  await axios.post('/estados-servicios', data)
}

const getById = async (id: number): Promise<IEstadoServicio> => {
  return await axios
    .get<IEstadoServicio>(`/estados-servicios/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (
  values: IUpdateEstadoServicio,
  userId: number
): Promise<void> => {
  const dataValues = {
    ...values,
    userId
  }
  const { data } = await axios.put('/estados-servicios', dataValues)
  return data
}

const select = async (): Promise<ISelectEstadoServicio[]> => {
  return await axios
    .get<ISelectEstadoServicio[]>('/estados-servicios/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { getAll, deleteById, create, update, getById, select }
