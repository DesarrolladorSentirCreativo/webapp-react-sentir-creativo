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

const update = async (
  descripcion: string,
  userId: number,
  id: number
): Promise<IComentario> => {
  const { data } = await axios.put('/comentarios', {
    id,
    descripcion,
    userId
  })
  return await getById(data)
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .delete(`/comentarios/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })
}

export default { create, getById, update, deleteById }
