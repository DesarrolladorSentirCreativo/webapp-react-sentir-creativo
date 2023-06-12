import axios from 'axios'

import { type IAfp, type IAfpSelect, type ICreateAfp } from '../models'

const getAll = async (): Promise<IAfp[]> => {
  return await axios
    .get<IAfp[]>('/afp')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/afp/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const create = async (values: ICreateAfp, userId: number): Promise<void> => {
  const data = {
    ...values,
    userId
  }
  await axios.post('/afp', data)
}

const getById = async (id: number): Promise<IAfp> => {
  return await axios
    .get<IAfp>(`/afp/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (values: IAfp, userId: number): Promise<void> => {
  const dataValues = {
    ...values,
    userId
  }
  const { data } = await axios.put('/afp', dataValues)
  return data
}

const select = async (): Promise<IAfpSelect[]> => {
  return await axios
    .get<IAfpSelect[]>('/afp/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { getAll, deleteById, create, update, getById, select }
