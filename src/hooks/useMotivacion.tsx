import { useDispatch, useSelector } from 'react-redux'

import { type SelectMotivacion } from '../models'
import { fetchMotivaciones } from '../redux/states/motivacion'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseMotivacionInterface {
  motivaciones: SelectMotivacion[]
  loadMotivaciones: () => Promise<void>
}

const useMotivacion = (): UseMotivacionInterface => {
  const dispatch: AppDispatch = useDispatch()
  const motivaciones = useSelector((state: RootState) => state.motivacion.listSelect)

  const loadMotivaciones = async (): Promise<void> => {
    dispatch(fetchMotivaciones())
  }

  return {
    motivaciones,
    loadMotivaciones
  }
}

export default useMotivacion
