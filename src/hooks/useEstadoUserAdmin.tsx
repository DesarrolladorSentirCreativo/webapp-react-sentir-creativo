import { useDispatch, useSelector } from 'react-redux'

import { type IEstadoUserAdminSelect } from '../models'
import { fetchEstadoUserAdmins } from '../redux/states/estadoUsuarioAdmin'
import { type AppDispatch, type RootState } from '../redux/store'

interface Props {
  estadoUserAdmins: IEstadoUserAdminSelect[]
  loadEstadoUserAdmins: () => Promise<void>
}

const useEstadoUserAdmin = (): Props => {
  const dispatch: AppDispatch = useDispatch()
  const estadoUserAdmins = useSelector(
    (state: RootState) => state.estadoUserAdmin.listSelect
  )

  const loadEstadoUserAdmins = async (): Promise<void> => {
    dispatch(fetchEstadoUserAdmins())
  }

  return {
    estadoUserAdmins,
    loadEstadoUserAdmins
  }
}

export default useEstadoUserAdmin
