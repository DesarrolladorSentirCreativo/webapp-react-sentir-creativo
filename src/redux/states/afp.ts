import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import { type IAfpSelect } from '../../models'
import afpService from '../../services/afp.service'

export interface AfpState {
  listSelect: IAfpSelect[]
}

const initialState: AfpState = {
  listSelect: []
}

export const AfpsSlice = createSlice({
  name: 'afp',
  initialState,
  reducers: {
    setAfpsList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setAfpsList } = AfpsSlice.actions

export default AfpsSlice.reducer

export const fetchAfps = () => async (dispatch: Dispatch) => {
  const data = await afpService.select()
  dispatch(setAfpsList(data))
}
