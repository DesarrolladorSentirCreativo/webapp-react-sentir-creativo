import axios from 'axios'

import { type IArchivo, type IComentario } from '../models'
import {
  type ICreateUsuarioAdmin,
  type ISelectUsuarioAdmin,
  type IUpdateUsuarioAdmin,
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
  comentarios: IComentario[],
  user: number
): Promise<void> => {
  const comentariosIds = comentarios.map((item: IComentario) => {
    return {
      comentarioId: item.id
    }
  })
  const data = { ...values, comentarios: comentariosIds, userId: user }
  await axios.post('/usuarios-admin', data)
}

const getById = async (id: number): Promise<IUpdateUsuarioAdmin> => {
  return await axios
    .get<IUpdateUsuarioAdmin>(`/usuarios-admin/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (
  values: IUpdateUsuarioAdmin,
  comentarios: IComentario[],
  archivos: IArchivo[],
  user: number
): Promise<void> => {
  const comentariosIds = comentarios.map((item: IComentario) => {
    return {
      comentarioId: item.id
    }
  })
  const archivosIds = archivos.map((item: IArchivo) => {
    return {
      archivoId: item.id
    }
  })

  const data = {
    ...values,
    comentarios: comentariosIds,
    archivos: archivosIds,
    userId: user
  }

  await axios.put('/usuarios-admin', data)
}

const select = async (): Promise<ISelectUsuarioAdmin[]> => {
  return await axios
    .get<ISelectUsuarioAdmin[]>('/usuarios-admin/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { deleteById, getAll, create, getById, update, select }
