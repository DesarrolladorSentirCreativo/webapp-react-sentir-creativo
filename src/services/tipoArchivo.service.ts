import axios from 'axios'

import { type ITipoArchivo } from '../models/tipoArchivos'

const select = async (): Promise<ITipoArchivo[]> => {
  return await axios
    .get<ITipoArchivo[]>('/tipos-archivos/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { select }
