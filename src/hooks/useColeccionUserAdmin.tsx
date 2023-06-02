import { useDispatch, useSelector } from 'react-redux'

import { type IColeccionUserAdminSelect } from '../models'
import { fetchColeccionUserAdmins } from '../redux/states/coleccionUserAdmin'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseColeccionUserAdminInterface {
  coleccionesUserAdmins: IColeccionUserAdminSelect[]
  loadColeccionUserAdmins: () => Promise<void>
}

const useColeccionUserAdmin = (): UseColeccionUserAdminInterface => {
  const dispatch: AppDispatch = useDispatch()
  const coleccionesUserAdmins = useSelector(
    (state: RootState) => state.coleccionUserAdmin.listSelect
  )

  const loadColeccionUserAdmins = async (): Promise<void> => {
    dispatch(fetchColeccionUserAdmins())
  }

  return {
    coleccionesUserAdmins,
    loadColeccionUserAdmins
  }
}

export default useColeccionUserAdmin
