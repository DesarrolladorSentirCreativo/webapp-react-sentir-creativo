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

const getById = async (id: number): Promise<IArchivo | null> => {
  try {
    const { data } = await axios.get<IArchivo>(`/archivos/${id}`)
    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

export default { create, getById }
