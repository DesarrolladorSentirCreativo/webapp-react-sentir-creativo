import axios from 'axios'

import {
  type IAccesos,
  type ICreatePrivilegio,
  type IGetByIdPrivilegio,
  type IUpdatePrivilegio
} from '../models'

const getAll = async (): Promise<any> => {
  return await axios
    .get<any>('/privilegios')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

const deleteById = async (id: number): Promise<void> => {
  await axios
    .put(`/privilegios/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const create = async (
  values: ICreatePrivilegio,
  userId: number,
  accesos: Record<number, IAccesos>
): Promise<void> => {
  const result = Object.entries(accesos).map(([coleccionId, attributes]) => ({
    coleccionId: parseInt(coleccionId),
    crear: attributes.crear,
    actualizar: attributes.actualizar,
    eliminar: attributes.eliminar,
    ver: attributes.ver,
    listar: attributes.ver
  }))
  const data = {
    ...values,
    userId,
    accesos: result
  }

  await axios.post('/privilegios', data)
}

const getById = async (id: string): Promise<IGetByIdPrivilegio> => {
  return await axios
    .get<IGetByIdPrivilegio>(`/privilegios/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}

const update = async (
  values: IUpdatePrivilegio,
  userId: number,
  accesos: Record<number, IAccesos>
): Promise<void> => {
  const result = Object.entries(accesos).map(([coleccionId, attributes]) => ({
    coleccionId: parseInt(coleccionId),
    crear: attributes.crear,
    actualizar: attributes.actualizar,
    eliminar: attributes.eliminar,
    ver: attributes.ver,
    listar: attributes.ver
  }))
  const data = {
    ...values,
    userId,
    accesos: result
  }
  await axios.put('/privilegios', data)
}

export default { getAll, deleteById, create, getById, update }
