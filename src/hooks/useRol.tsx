import { useDispatch, useSelector } from 'react-redux'

import { type IRolSelect } from '../models'
import { fetchRoles } from '../redux/states/rol'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseRolInterface {
  roles: IRolSelect[]
  loadRoles: () => Promise<void>
}

const useRol = (): UseRolInterface => {
  const dispatch: AppDispatch = useDispatch()
  const roles = useSelector((state: RootState) => state.rol.listSelect)

  const loadRoles = async (): Promise<void> => {
    dispatch(fetchRoles())
  }

  return {
    roles,
    loadRoles
  }
}

export default useRol
