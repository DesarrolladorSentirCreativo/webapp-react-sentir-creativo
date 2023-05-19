import axios from 'axios'

import { type IArchivo } from '../models'

const create = async (
  nombre: string,
  path: string,
  tipoArchivoId: number,
  publico: boolean
): Promise<number | null> => {
  const data = {
    nombre,
    path,
    tipoArchivoId,
    publico
  }
  return await axios
    .post<number>('/archivos', data)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
      return null
    })
}

const update = async (
  id: number,
  nombre: string,
  path: string,
  tipoArchivoId: number,
  publico: boolean
): Promise<number | null> => {
  const data = {
    id,
    nombre,
    path,
    tipoArchivoId,
    publico
  }
  return await axios
    .put<number>('/archivos', data)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
      return null
    })
}

const getById = async (id: number): Promise<IArchivo | null> => {
  try {
    const { data } = await axios.get<IArchivo>(`/archivos/${id}`)
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .delete(`/archivos/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })
}

export default { create, getById, update, deleteById }
