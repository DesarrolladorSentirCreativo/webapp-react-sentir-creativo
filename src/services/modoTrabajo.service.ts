import axios from 'axios'

import {
  type ICreateModoTrabajo,
  type IModoTrabajo,
  type IModoTrabajoSelect
} from '../models'

const getAll = async (): Promise<IModoTrabajo[]> => {
  return await axios
    .get<IModoTrabajo[]>('/modos-trabajos')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/modos-trabajos/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const create = async (
  values: ICreateModoTrabajo,
  userId: number
): Promise<void> => {
  const data = {
    ...values,
    userId
  }
  await axios.post('/modos-trabajos', data)
}

const getById = async (id: number): Promise<IModoTrabajo> => {
  return await axios
    .get<IModoTrabajo>(`/modos-trabajos/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (values: IModoTrabajo, userId: number): Promise<void> => {
  const dataValues = {
    ...values,
    userId
  }
  const { data } = await axios.put('/modos-trabajos', dataValues)
  return data
}

const select = async (): Promise<IModoTrabajoSelect[]> => {
  return await axios
    .get<IModoTrabajoSelect[]>('/modos-trabajos/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { getAll, deleteById, create, update, getById, select }
