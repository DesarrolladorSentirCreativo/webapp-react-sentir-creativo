import axios from 'axios'

import {
  type ICreateFormato,
  type IFormato,
  type ISelectFormato,
  type IUpdateFormato
} from '../models/formato'

const getAll = async (): Promise<IFormato[]> => {
  return await axios
    .get<IFormato[]>('/formatos')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/formatos/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const select = async (): Promise<ISelectFormato[]> => {
  return await axios
    .get<ISelectFormato[]>('/formatos/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const create = async (
  values: ICreateFormato,
  userId: number
): Promise<void> => {
  const data = {
    ...values,
    userId
  }
  await axios.post('/formatos', data)
}

const getById = async (id: number): Promise<IFormato> => {
  return await axios
    .get<IFormato>(`/formatos/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (
  values: IUpdateFormato,
  userId: number
): Promise<void> => {
  const dataValues = {
    ...values,
    userId
  }
  const { data } = await axios.put('/formatos', dataValues)
  return data
}

export default { getAll, deleteById, select, create, update, getById }
