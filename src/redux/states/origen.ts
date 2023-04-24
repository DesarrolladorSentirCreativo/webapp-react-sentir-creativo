import { createSlice, type Dispatch, type PayloadAction } from '@reduxjs/toolkit'

import { type SelectOrigen } from '../../models'
import origenService from '../../services/origen.service'

export interface OrigenState {
  listSelect: SelectOrigen[]
}

const initialState: OrigenState = {
  listSelect: []
}

export const origenesSlice = createSlice({
  name: 'origen',
  initialState,
  reducers: {
    setOrigenesList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setOrigenesList } = origenesSlice.actions

export default origenesSlice.reducer

export const fetchOrigenes = () => async (dispatch: Dispatch) => {
  const data = await origenService.select()
  dispatch(setOrigenesList(data))
}
