import { useDispatch, useSelector } from 'react-redux'

import { type SelectPrefijo } from '../models'
import { fetchPrefijos } from '../redux/states/prefijo'
import { type AppDispatch, type RootState } from '../redux/store'

interface UsePrefijoInterface {
  prefijos: SelectPrefijo[]
  loadPrefijos: () => Promise<void>
}

const usePrefijo = (): UsePrefijoInterface => {
  const dispatch: AppDispatch = useDispatch()
  const prefijos = useSelector((state: RootState) => state.prefijo.listSelect)

  const loadPrefijos = async (): Promise<void> => {
    dispatch(fetchPrefijos())
  }

  return {
    prefijos,
    loadPrefijos
  }
}

export default usePrefijo
