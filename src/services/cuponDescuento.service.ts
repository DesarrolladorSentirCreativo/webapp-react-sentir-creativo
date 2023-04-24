import axios from 'axios'

import { type SelectCuponDescuento } from '../models'

const select = async (): Promise<SelectCuponDescuento[]> => {
  return await axios
    .get<SelectCuponDescuento[]>('/cupones-descuentos/select')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
      return []
    })
}

export default { select }
