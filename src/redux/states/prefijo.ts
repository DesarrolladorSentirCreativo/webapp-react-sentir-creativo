import { createSlice, type Dispatch, type PayloadAction } from '@reduxjs/toolkit'

import { type SelectPrefijo } from '../../models'
import motivacionService from '../../services/motivacion.service'

export interface PrefijoState {
  listSelect: SelectPrefijo[]
}

const initialState: PrefijoState = {
  listSelect: []
}

export const prefijosSlice = createSlice({
  name: 'prefijo',
  initialState,
  reducers: {
    setPrefijosList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setPrefijosList } = prefijosSlice.actions

export default prefijosSlice.reducer

export const fetchPrefijos = () => async (dispatch: Dispatch) => {
  const data = await motivacionService.select()
  dispatch(setPrefijosList(data))
}
