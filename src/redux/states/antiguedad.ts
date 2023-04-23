import { createSlice, type Dispatch, type PayloadAction } from '@reduxjs/toolkit'

import { type SelectAntiguedad } from '../../models'
import antiguedadService from '../../services/antiguedad.service'

export interface AntiguedadState {
  listSelect: SelectAntiguedad[]
}

const initialState: AntiguedadState = {
  listSelect: []
}

export const antiguedadesSlice = createSlice({
  name: 'antiguedad',
  initialState,
  reducers: {
    setAntiguedadesList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setAntiguedadesList } = antiguedadesSlice.actions

export default antiguedadesSlice.reducer

export const fetchAntiguedades = () => async (dispatch: Dispatch) => {
  const data = await antiguedadService.select()
  dispatch(setAntiguedadesList(data))
}
