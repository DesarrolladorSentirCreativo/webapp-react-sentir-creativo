import axios from 'axios'

import { type SelectPrefijo } from '../models'

const select = async (): Promise<SelectPrefijo[]> => {
  return await axios
    .get<SelectPrefijo[]>('/prefijos/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { select }
