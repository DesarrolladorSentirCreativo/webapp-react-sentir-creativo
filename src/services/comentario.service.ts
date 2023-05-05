import axios from 'axios'

import { type IComentario } from '../models'

const getById = async (id: number): Promise<IComentario> => {
  const { data } = await axios.get<IComentario>(`/comentarios/${id}`)
  return data
}

const create = async (value: string, userId: number): Promise<IComentario> => {
  const { data } = await axios.post('/comentarios', {
    descripcion: value,
    userId
  })
  return await getById(data)
}

export default { create, getById }
