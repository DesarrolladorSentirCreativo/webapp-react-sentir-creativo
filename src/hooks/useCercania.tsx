import { useDispatch, useSelector } from 'react-redux'

import { type SelectCercania } from '../models'
import { fetchCercanias } from '../redux/states/cercania'
import { type AppDispatch, type RootState } from '../redux/store'

interface Props {
  cercanias: SelectCercania[]
  loadCercanias: () => Promise<void>
}

const useCercania = (): Props => {
  const dispatch: AppDispatch = useDispatch()
  const cercanias = useSelector((state: RootState) => state.cercania.listSelect)

  const loadCercanias = async (): Promise<void> => {
    dispatch(fetchCercanias())
  }

  return {
    cercanias,
    loadCercanias
  }
}

export default useCercania
