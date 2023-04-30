import { useDispatch, useSelector } from 'react-redux'

import { type SelectRubro } from '../models'
import { fetchRubros } from '../redux/states/rubro'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseRubroInterface {
  rubros: SelectRubro[]
  loadRubros: () => Promise<void>
}

const useRubro = (): UseRubroInterface => {
  const dispatch: AppDispatch = useDispatch()
  const rubros = useSelector((state: RootState) => state.rubro.listSelect)

  const loadRubros = async (): Promise<void> => {
    dispatch(fetchRubros())
  }

  return {
    rubros,
    loadRubros
  }
}

export default useRubro
