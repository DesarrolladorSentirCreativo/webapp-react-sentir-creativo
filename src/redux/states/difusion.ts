import { createSlice, type Dispatch, type PayloadAction } from '@reduxjs/toolkit'

import { type SelectDifusion } from '../../models'
import difusionService from '../../services/difusion.service'

export interface DifusionState {
  listSelect: SelectDifusion[]
}

const initialState: DifusionState = {
  listSelect: []
}

export const difusionesSlice = createSlice({
  name: 'difusion',
  initialState,
  reducers: {
    setDifusionesList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setDifusionesList } = difusionesSlice.actions

export default difusionesSlice.reducer

export const fetchDifusiones = () => async (dispatch: Dispatch) => {
  const data = await difusionService.select()
  dispatch(setDifusionesList(data))
}
