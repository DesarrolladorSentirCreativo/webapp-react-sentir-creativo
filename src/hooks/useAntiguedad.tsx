import { useDispatch, useSelector } from 'react-redux'

import { type SelectAntiguedad } from '../models'
import { fetchAntiguedades } from '../redux/states/antiguedad'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseAntiguedadInterface {
  antiguedades: SelectAntiguedad[]
  loadAntiguedades: () => Promise<void>
}

const useAntiguedad = (): UseAntiguedadInterface => {
  const dispatch: AppDispatch = useDispatch()
  const antiguedades = useSelector((state: RootState) => state.antiguedad.listSelect)

  const loadAntiguedades = async (): Promise<void> => {
    dispatch(fetchAntiguedades())
  }

  return {
    antiguedades,
    loadAntiguedades
  }
}

export default useAntiguedad
