import { useDispatch, useSelector } from 'react-redux'

import {
  type SelectCiudad,
  type SelectPais,
  type SelectRegion
} from '../models'
import {
  fetchCiudades,
  fetchPaises,
  fetchRegiones
} from '../redux/states/direccion'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseDireccionInterface {
  paises: SelectPais[]
  regiones: SelectRegion[]
  ciudades: SelectCiudad[]
  loadPaises: () => Promise<void>
  loadRegiones: () => Promise<void>
  loadCiudades: () => Promise<void>
}

const useDireccion = (): UseDireccionInterface => {
  const dispatch: AppDispatch = useDispatch()
  const paises = useSelector(
    (state: RootState) => state.direccion.listSelectPais
  )
  const regiones = useSelector(
    (state: RootState) => state.direccion.listSelectRegion
  )

  const ciudades = useSelector(
    (state: RootState) => state.direccion.listSelectCiudad
  )

  const loadPaises = async (): Promise<void> => {
    dispatch(fetchPaises())
  }

  const loadRegiones = async (): Promise<void> => {
    dispatch(fetchRegiones())
  }

  const loadCiudades = async (): Promise<void> => {
    dispatch(fetchCiudades())
  }

  return {
    paises,
    loadPaises,
    regiones,
    loadRegiones,
    ciudades,
    loadCiudades
  }
}

export default useDireccion
