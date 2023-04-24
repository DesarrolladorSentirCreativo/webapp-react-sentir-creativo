import { createSlice, type Dispatch, type PayloadAction } from '@reduxjs/toolkit'

import { type SelectMotivacion } from '../../models'
import motivacionService from '../../services/motivacion.service'

export interface MotivacionState {
  listSelect: SelectMotivacion[]
}

const initialState: MotivacionState = {
  listSelect: []
}

export const motivacionesSlice = createSlice({
  name: 'motivacion',
  initialState,
  reducers: {
    setMotivacionesList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setMotivacionesList } = motivacionesSlice.actions

export default motivacionesSlice.reducer

export const fetchMotivaciones = () => async (dispatch: Dispatch) => {
  const data = await motivacionService.select()
  dispatch(setMotivacionesList(data))
}
