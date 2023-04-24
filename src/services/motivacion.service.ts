import axios from 'axios'

import { type SelectMotivacion } from '../models'

const select = async (): Promise<SelectMotivacion[]> => {
  return await axios
    .get<SelectMotivacion[]>('/motivaciones/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { select }
