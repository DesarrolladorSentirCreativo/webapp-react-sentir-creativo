import axios from 'axios'

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

export default { getAll, deleteById }
