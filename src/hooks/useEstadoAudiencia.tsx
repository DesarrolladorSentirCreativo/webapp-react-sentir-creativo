import { useDispatch, useSelector } from 'react-redux'

import { type SelectEstadoAudiencia } from '../models'
import { fetchEstadoAudiencias } from '../redux/states/estadoAudiencia'
import { type AppDispatch, type RootState } from '../redux/store'

interface Props {
  estadoAudiencias: SelectEstadoAudiencia[]
  loadEstadoAudiencias: () => Promise<void>
}

const useEstadoAudiencia = (): Props => {
  const dispatch: AppDispatch = useDispatch()
  const estadoAudiencias = useSelector(
    (state: RootState) => state.estadoAudiencia.listSelect
  )

  const loadEstadoAudiencias = async (): Promise<void> => {
    dispatch(fetchEstadoAudiencias())
  }

  return {
    estadoAudiencias,
    loadEstadoAudiencias
  }
}

export default useEstadoAudiencia
