import axios from 'axios'

const create = async (value: string): Promise<void> => {
  const { data } = await axios.post('/comentarios', {
    descripcion: value
  })
  return data
}

export default { create }
