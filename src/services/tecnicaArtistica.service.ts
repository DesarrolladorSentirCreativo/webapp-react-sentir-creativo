import axios from 'axios'

import {
  type ICreateTecnicaArtistica,
  type ISelectTecnicaArtistica,
  type ITecnicaArtistica,
  type IUpdateTecnicaArtistica
} from '../models'

const getAll = async (): Promise<ITecnicaArtistica[]> => {
  return await axios
    .get<ITecnicaArtistica[]>('/tecnicas-artisticas')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/tecnicas-artisticas/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const select = async (): Promise<ISelectTecnicaArtistica[]> => {
  return await axios
    .get<ISelectTecnicaArtistica[]>('/tecnicas-artisticas/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const create = async (
  values: ICreateTecnicaArtistica,
  userId: number
): Promise<void> => {
  const data = {
    ...values,
    userId
  }
  await axios.post('/tecnicas-artisticas', data)
}

const getById = async (id: number): Promise<ITecnicaArtistica> => {
  return await axios
    .get<ITecnicaArtistica>(`/tecnicas-artisticas/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (
  values: IUpdateTecnicaArtistica,
  userId: number
): Promise<void> => {
  const dataValues = {
    ...values,
    userId
  }
  const { data } = await axios.put('/tecnicas-artisticas', dataValues)
  return data
}

export default { getAll, deleteById, select, create, update, getById }
