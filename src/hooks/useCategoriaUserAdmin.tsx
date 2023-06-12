import { useDispatch, useSelector } from 'react-redux'

import { type ICategoriaUserAdminSelect } from '../models'
import { fetchCategoriaUserAdmins } from '../redux/states/categoriaUserAdmin'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseCategoriaUserAdminInterface {
  categoriaUserAdmins: ICategoriaUserAdminSelect[]
  loadCategoriaUserAdmins: () => Promise<void>
}

const useCategoriUserAdmin = (): UseCategoriaUserAdminInterface => {
  const dispatch: AppDispatch = useDispatch()
  const categoriaUserAdmins = useSelector(
    (state: RootState) => state.categoriaUserAdmin.listSelect
  )

  const loadCategoriaUserAdmins = async (): Promise<void> => {
    dispatch(fetchCategoriaUserAdmins())
  }

  return {
    categoriaUserAdmins,
    loadCategoriaUserAdmins
  }
}

export default useCategoriUserAdmin
