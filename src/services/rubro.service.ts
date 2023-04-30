import axios from 'axios'

import { type SelectRubro } from '../models'

const select = async (): Promise<SelectRubro[]> => {
  return await axios
    .get<SelectRubro[]>('/rubros/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { select }
