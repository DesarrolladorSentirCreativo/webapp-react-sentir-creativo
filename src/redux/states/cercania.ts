import { createSlice, type Dispatch, type PayloadAction } from '@reduxjs/toolkit'

import { type SelectCercania } from '../../models'
import cercaniaService from '../../services/cercania.service'

export interface CercaniaState {
  listSelect: SelectCercania[]
}

const initialState: CercaniaState = {
  listSelect: []
}

export const cercaniasSlice = createSlice({
  name: 'cercania',
  initialState,
  reducers: {
    setCercaniasList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setCercaniasList } = cercaniasSlice.actions

export default cercaniasSlice.reducer

export const fetchCercanias = () => async (dispatch: Dispatch) => {
  const data = await cercaniaService.select()
  dispatch(setCercaniasList(data))
}
