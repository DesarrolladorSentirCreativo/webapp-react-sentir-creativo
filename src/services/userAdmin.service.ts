import axios from 'axios'

import { type IComentario } from '../models'
import {
  type ICreateUsuarioAdmin,
  type IUsuarioAdmin
} from '../models/usuarioAdmin'

const getAll = async (): Promise<IUsuarioAdmin[]> => {
  return await axios
    .get<IUsuarioAdmin[]>('/usuarios-admin')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/usuarios-admin/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const create = async (
  values: ICreateUsuarioAdmin,
  comentarios: IComentario[]
): Promise<void> => {
  const comentariosIds = comentarios.map((item: IComentario) => {
    return {
      comentarioId: item.id
    }
  })
  const data = { ...values, comentarios: comentariosIds }
  await axios.post('/usuarios-admin', data)
}

export default { deleteById, getAll, create }
