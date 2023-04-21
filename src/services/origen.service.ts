import axios from 'axios'

import { type SelectOrigen } from '../models'

const select = async (): Promise<SelectOrigen[]> => {
  return await axios
    .get<SelectOrigen[]>('/origenes/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { select }
