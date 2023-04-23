import axios from 'axios'

import { type SelectAntiguedad } from '../models'

const select = async (): Promise<SelectAntiguedad[]> => {
  return await axios
    .get<SelectAntiguedad[]>('/antiguedades/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { select }
