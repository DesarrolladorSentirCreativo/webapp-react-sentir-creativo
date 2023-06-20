import { useDispatch, useSelector } from 'react-redux'

import { type IModoTrabajoSelect } from '../models'
import { fetchModosTrabajos } from '../redux/states/modoTrabajo'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseMoodoTrabajoInterface {
  modosTrabajos: IModoTrabajoSelect[]
  loadModosTrabajos: () => Promise<void>
}

const useModoTrabajo = (): UseMoodoTrabajoInterface => {
  const dispatch: AppDispatch = useDispatch()
  const modosTrabajos = useSelector(
    (state: RootState) => state.modoTrabajo.listSelect
  )

  const loadModosTrabajos = async (): Promise<void> => {
    dispatch(fetchModosTrabajos())
  }

  return {
    modosTrabajos,
    loadModosTrabajos
  }
}

export default useModoTrabajo
