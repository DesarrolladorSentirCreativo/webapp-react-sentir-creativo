import axios from 'axios'

import { type SelectCercania } from '../models'

const select = async (): Promise<SelectCercania[]> => {
  return await axios
    .get<SelectCercania[]>('/cercanias/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { select }
