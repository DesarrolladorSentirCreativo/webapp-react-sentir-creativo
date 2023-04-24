import axios from 'axios'

import { type SelectDifusion } from '../models'

const select = async (): Promise<SelectDifusion[]> => {
  return await axios
    .get<SelectDifusion[]>('/difusiones/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { select }
