import { useDispatch, useSelector } from 'react-redux'

import { type IPrevisionSelect } from '../models'
import { fetchPrevisiones } from '../redux/states/prevision'
import { type AppDispatch, type RootState } from '../redux/store'

interface UsePrevisionInterface {
  previsiones: IPrevisionSelect[]
  loadPrevisiones: () => Promise<void>
}

const usePrevisiones = (): UsePrevisionInterface => {
  const dispatch: AppDispatch = useDispatch()
  const previsiones = useSelector(
    (state: RootState) => state.prevision.listSelect
  )

  const loadPrevisiones = async (): Promise<void> => {
    dispatch(fetchPrevisiones())
  }

  return {
    previsiones,
    loadPrevisiones
  }
}

export default usePrevisiones
