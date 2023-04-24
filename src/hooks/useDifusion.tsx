import { useDispatch, useSelector } from 'react-redux'

import { type SelectDifusion } from '../models'
import { fetchDifusiones } from '../redux/states/difusion'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseDifusionInterface {
  difusiones: SelectDifusion[]
  loadDifusiones: () => Promise<void>
}

const useDifusion = (): UseDifusionInterface => {
  const dispatch: AppDispatch = useDispatch()
  const difusiones = useSelector((state: RootState) => state.difusion.listSelect)

  const loadDifusiones = async (): Promise<void> => {
    dispatch(fetchDifusiones())
  }

  return {
    difusiones,
    loadDifusiones
  }
}

export default useDifusion
