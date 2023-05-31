import axios from 'axios'

import { type ICreateModulo, type IModulo, type ISelectModulo } from '../models'

const getAll = async (): Promise<IModulo[]> => {
  return await axios
    .get<IModulo[]>('/modulos')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/modulos/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const create = async (values: ICreateModulo, userId: number): Promise<void> => {
  const data = {
    ...values,
    userId
  }
  await axios.post('/modulos', data)
}

const getById = async (id: number): Promise<IModulo> => {
  return await axios
    .get<IModulo>(`/modulos/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (values: IModulo, userId: number): Promise<void> => {
  const dataValues = {
    ...values,
    userId
  }
  const { data } = await axios.put('/modulos', dataValues)
  return data
}

const select = async (): Promise<ISelectModulo[]> => {
  return await axios
    .get<ISelectModulo[]>('/modulos/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { getAll, deleteById, create, getById, update, select }
