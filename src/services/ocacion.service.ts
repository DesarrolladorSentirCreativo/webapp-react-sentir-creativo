import axios from 'axios'

import {
  type ICreateOcacion,
  type IOcacion,
  type ISelectOcacion,
  type IUpdateOcacion
} from '../models'

const getAll = async (): Promise<IOcacion[]> => {
  return await axios
    .get<IOcacion[]>('/ocaciones')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/ocaciones/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}
const select = async (): Promise<ISelectOcacion[]> => {
  return await axios
    .get<ISelectOcacion[]>('/ocaciones/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const create = async (
  values: ICreateOcacion,
  userId: number
): Promise<void> => {
  const data = {
    ...values
  }
  await axios.post('/ocaciones', data)
}

const getById = async (id: number): Promise<IUpdateOcacion> => {
  return await axios
    .get<IUpdateOcacion>(`/ocaciones/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (
  values: IUpdateOcacion,
  userId: number
): Promise<void> => {
  const dataValues = {
    ...values,
    userId
  }
  const { data } = await axios.put('/ocaciones', dataValues)
  return data
}

export default { getAll, deleteById, select, create, update, getById }
