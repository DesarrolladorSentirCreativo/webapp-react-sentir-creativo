import { useDispatch, useSelector } from 'react-redux'

import { type IAfpSelect } from '../models'
import { fetchAfps } from '../redux/states/afp'
import { type AppDispatch, type RootState } from '../redux/store'

interface UseAfpInterface {
  afps: IAfpSelect[]
  loadAfps: () => Promise<void>
}

const useAfp = (): UseAfpInterface => {
  const dispatch: AppDispatch = useDispatch()
  const afps = useSelector((state: RootState) => state.afp.listSelect)

  const loadAfps = async (): Promise<void> => {
    dispatch(fetchAfps())
  }

  return {
    afps,
    loadAfps
  }
}

export default useAfp
