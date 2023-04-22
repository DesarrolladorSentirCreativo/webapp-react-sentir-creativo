import axios from 'axios'

import { type SelectEstadoAudiencia } from '../models'

const select = async (): Promise<SelectEstadoAudiencia[]> => {
  return await axios
    .get<SelectEstadoAudiencia[]>('/estados-audiencias/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { select }
