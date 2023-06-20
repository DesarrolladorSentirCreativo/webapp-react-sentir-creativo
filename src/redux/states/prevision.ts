import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import { type IPrevisionSelect } from '../../models'
import previsionService from '../../services/prevision.service'

export interface PrevisionState {
  listSelect: IPrevisionSelect[]
}

const initialState: PrevisionState = {
  listSelect: []
}

export const previsionSlice = createSlice({
  name: 'prevision',
  initialState,
  reducers: {
    setPrevisionesList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setPrevisionesList } = previsionSlice.actions

export default previsionSlice.reducer

export const fetchPrevisiones = () => async (dispatch: Dispatch) => {
  const data = await previsionService.select()
  dispatch(setPrevisionesList(data))
}
