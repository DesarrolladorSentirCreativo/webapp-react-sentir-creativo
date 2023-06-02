import { useDispatch, useSelector } from 'react-redux'

import { type ICategoriaPrivilegioSelect } from '../models'
import { fetchCategoriaPrivilegios } from '../redux/states/categoriaPrivilegio'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseCategoriaPrivilegioInterface {
  categoriaPrivilegios: ICategoriaPrivilegioSelect[]
  loadCategoriaPrivilegios: () => Promise<void>
}

const useCategoriPrivilegio = (): UseCategoriaPrivilegioInterface => {
  const dispatch: AppDispatch = useDispatch()
  const categoriaPrivilegios = useSelector(
    (state: RootState) => state.categoriaPrivilegio.listSelect
  )

  const loadCategoriaPrivilegios = async (): Promise<void> => {
    dispatch(fetchCategoriaPrivilegios())
  }

  return {
    categoriaPrivilegios,
    loadCategoriaPrivilegios
  }
}

export default useCategoriPrivilegio
