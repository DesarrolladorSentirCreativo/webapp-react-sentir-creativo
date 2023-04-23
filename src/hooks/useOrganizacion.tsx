import { useDispatch, useSelector } from 'react-redux'

import { type SelectOrganizacion } from '../models/organizacion'
import { fetchOrganizaciones } from '../redux/states/organizacion'
import { type AppDispatch, type RootState } from '../redux/store'

interface Props {
  organizaciones: SelectOrganizacion[]
  loadOrganizaciones: () => Promise<void>
}

const useOrganizacion = (): Props => {
  const dispatch: AppDispatch = useDispatch()
  const organizaciones = useSelector((state: RootState) => state.organizacion.listSelect)

  const loadOrganizaciones = async (): Promise<void> => {
    dispatch(fetchOrganizaciones())
  }

  return {
    organizaciones,
    loadOrganizaciones
  }
}

export default useOrganizacion
