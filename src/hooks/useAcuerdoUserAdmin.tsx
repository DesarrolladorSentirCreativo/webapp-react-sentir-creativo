import { useDispatch, useSelector } from 'react-redux'

import { type ISelectAcuerdoUserAdmin } from '../models'
import { fetchAcuerdoUserAdmins } from '../redux/states/acuerdoUserAdmin'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseAcuerdoUserAdminInterface {
  acuerdosUserAdmins: ISelectAcuerdoUserAdmin[]
  loadAcuerdoUserAdmins: () => Promise<void>
}

const useAcuerdoUserAdmin = (): UseAcuerdoUserAdminInterface => {
  const dispatch: AppDispatch = useDispatch()
  const acuerdosUserAdmins = useSelector(
    (state: RootState) => state.acuerdoUserAdmin.listSelect
  )

  const loadAcuerdoUserAdmins = async (): Promise<void> => {
    dispatch(fetchAcuerdoUserAdmins())
  }

  return {
    acuerdosUserAdmins,
    loadAcuerdoUserAdmins
  }
}

export default useAcuerdoUserAdmin
