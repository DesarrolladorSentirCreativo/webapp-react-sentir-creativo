import axios from 'axios'

import { type IUsuarioAdmin } from '../models/usuarioAdmin'

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

export default { deleteById, getAll }
