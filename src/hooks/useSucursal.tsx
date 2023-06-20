import { useDispatch, useSelector } from 'react-redux'

import { type ISelectSucursal } from '../models/sucursal'
import { fetchSucursales } from '../redux/states/sucursal'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseSucursalInterface {
  sucursales: ISelectSucursal[]
  loadSucursales: () => Promise<void>
}

const useSucursales = (): UseSucursalInterface => {
  const dispatch: AppDispatch = useDispatch()
  const sucursales = useSelector((state: RootState) => state.sucursal.select)

  const loadSucursales = async (): Promise<void> => {
    dispatch(fetchSucursales())
  }

  return {
    sucursales,
    loadSucursales
  }
}

export default useSucursales
