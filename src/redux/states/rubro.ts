import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import { type SelectRubro } from '../../models'
import rubroService from '../../services/rubro.service'

export interface RubroState {
  listSelect: SelectRubro[]
}

const initialState: RubroState = {
  listSelect: []
}

export const rubrosSlice = createSlice({
  name: 'rubro',
  initialState,
  reducers: {
    setRubrosList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setRubrosList } = rubrosSlice.actions

export default rubrosSlice.reducer

export const fetchRubros = () => async (dispatch: Dispatch) => {
  const data = await rubroService.select()
  dispatch(setRubrosList(data))
}
