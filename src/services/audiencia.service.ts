import axios from 'axios'

import { type IArchivo, type IComentario } from '../models'
import {
  type Audiencia,
  type CreateAudiencia,
  type IListAudiencia,
  type UpdateAudiencia
} from '../models/audiencia'
import { type IPagination } from '../models/pagination'

const paginate = async (
  pageSize: number,
  pageIndex: number
): Promise<IPagination<IListAudiencia>> => {
  const { data } = await axios.get<IPagination<IListAudiencia>>('/audiencias', {
    params: {
      pageIndex,
      pageSize
    }
  })
  return data
}

const getAll = async (): Promise<Audiencia[]> => {
  return await axios
    .get<Audiencia[]>('/audiencias/all')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const getById = async (id: number): Promise<UpdateAudiencia> => {
  return await axios
    .get<UpdateAudiencia>(`/audiencias/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/audiencias/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const create = async (
  values: CreateAudiencia,
  comentarios: IComentario[]
): Promise<void> => {
  const comentariosIds = comentarios.map((item: IComentario) => {
    return {
      comentarioId: item.id
    }
  })
  const data = { ...values, comentariosIds }
  await axios.post('/audiencias', data)
}

const update = async (
  values: UpdateAudiencia,
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

  console.log(typeof values.celular === 'number')
  const data = {
    ...values,
    comentarios: comentariosIds,
    archivos: archivosIds,
    userId: user
  }
  await axios.put('/audiencias', data)
}

export default { paginate, getAll, deleteById, create, getById, update }
