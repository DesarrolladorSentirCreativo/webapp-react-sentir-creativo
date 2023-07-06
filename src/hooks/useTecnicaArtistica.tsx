import { useDispatch, useSelector } from 'react-redux'

import { type ISelectTecnicaArtistica } from '../models'
import { fetchTecnicasArtisticas } from '../redux/states/tecnicaArtistica'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseTecnicaArtisticaInterface {
  tecnicasArtisticas: ISelectTecnicaArtistica[]
  loadTecnicasArtisticas: () => Promise<void>
}

const useTecnicaArtisticas = (): UseTecnicaArtisticaInterface => {
  const dispatch: AppDispatch = useDispatch()
  const tecnicasArtisticas = useSelector(
    (state: RootState) => state.sucursal.select
  )

  const loadTecnicasArtisticas = async (): Promise<void> => {
    dispatch(fetchTecnicasArtisticas())
  }

  return {
    tecnicasArtisticas,
    loadTecnicasArtisticas
  }
}

export default useTecnicaArtisticas
