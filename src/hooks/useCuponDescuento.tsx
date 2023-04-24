import { useDispatch, useSelector } from 'react-redux'

import { type SelectCuponDescuento } from '../models'
import { fetchCuponDescuentos } from '../redux/states/cuponDescuento'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseCuponDescuentoInterface {
  cuponDescuentos: SelectCuponDescuento[]
  loadCuponDescuentos: () => Promise<void>
}

const useCuponDescuento = (): UseCuponDescuentoInterface => {
  const dispatch: AppDispatch = useDispatch()
  const cuponDescuentos = useSelector((state: RootState) => state.cuponDescuento.listSelect)

  const loadCuponDescuentos = async (): Promise<void> => {
    dispatch(fetchCuponDescuentos())
  }

  return {
    cuponDescuentos,
    loadCuponDescuentos
  }
}

export default useCuponDescuento
