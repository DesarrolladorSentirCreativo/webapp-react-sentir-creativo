import { useDispatch, useSelector } from 'react-redux'

import { type SelectOrigen } from '../models'
import { fetchOrigenes } from '../redux/states/origen'
import { type AppDispatch, type RootState } from '../redux/store'

interface Props {
  origenes: SelectOrigen[]
  loadOrigenes: () => Promise<void>
}

const useOrigen = (): Props => {
  const dispatch: AppDispatch = useDispatch()
  const origenes = useSelector((state: RootState) => state.origen.listSelect)

  const loadOrigenes = async (): Promise<void> => {
    dispatch(fetchOrigenes())
  }

  return {
    origenes,
    loadOrigenes
  }
}

export default useOrigen
