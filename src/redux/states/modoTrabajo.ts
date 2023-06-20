import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import { type IModoTrabajoSelect } from '../../models'
import modoTrabajoService from '../../services/modoTrabajo.service'

export interface ModoTrabajoState {
  listSelect: IModoTrabajoSelect[]
}

const initialState: ModoTrabajoState = {
  listSelect: []
}

export const modosTrabajosSlice = createSlice({
  name: 'modoTrabajo',
  initialState,
  reducers: {
    setModosTrabajosList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setModosTrabajosList } = modosTrabajosSlice.actions

export default modosTrabajosSlice.reducer

export const fetchModosTrabajos = () => async (dispatch: Dispatch) => {
  const data = await modoTrabajoService.select()
  dispatch(setModosTrabajosList(data))
}
