import { useDispatch, useSelector } from 'react-redux'

import { type ISelectUsuarioAdmin } from '../models'
import { fetchUsuariosAdmins } from '../redux/states/usuarioAdmin'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseUsuarioAdminInterface {
  usuariosAdmins: ISelectUsuarioAdmin[]
  loadUsuariosAdmins: () => Promise<void>
}

const useUsuarioAdmin = (): UseUsuarioAdminInterface => {
  const dispatch: AppDispatch = useDispatch()
  const usuariosAdmins = useSelector(
    (state: RootState) => state.usuarioAdmin.listSelect
  )

  const loadUsuariosAdmins = async (): Promise<void> => {
    dispatch(fetchUsuariosAdmins())
  }

  return {
    usuariosAdmins,
    loadUsuariosAdmins
  }
}

export default useUsuarioAdmin
