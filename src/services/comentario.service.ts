import axios from 'axios'

import { type IComentario } from '../models'

const getById = async (id: number): Promise<IComentario | null> => {
  try {
    const { data } = await axios.get<IComentario>(`/comentarios/${id}`)
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

const create = async (value: string, userId: number): Promise<IComentario> => {
  const { data } = await axios.post('/comentarios', {
    descripcion: value,
    userId
  })
  const organizacion = await getById(data)

  if (organizacion !== null) return organizacion

  return {
    id: 0,
    descripcion: '',
    publishedAt: new Date(),
    usuario: 'Usuario'
  }
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
  const organizacion = await getById(data)

  if (organizacion !== null) return organizacion

  return {
    id: 0,
    descripcion: '',
    publishedAt: new Date(),
    usuario: 'Usuario'
  }
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
