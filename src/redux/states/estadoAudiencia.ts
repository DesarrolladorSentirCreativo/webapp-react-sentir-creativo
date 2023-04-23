import { createSlice, type Dispatch, type PayloadAction } from '@reduxjs/toolkit'

import { type SelectEstadoAudiencia } from '../../models'
import estadoAudienciaService from '../../services/estadoAudiencia.service'

export interface EstadoAudienciaState {
  listSelect: SelectEstadoAudiencia[]
}

const initialState: EstadoAudienciaState = {
  listSelect: []
}

export const estadoAudienciaSlice = createSlice({
  name: 'estadoAudiencia',
  initialState,
  reducers: {
    setEstadoAudienciasList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setEstadoAudienciasList } = estadoAudienciaSlice.actions

export default estadoAudienciaSlice.reducer

export const fetchEstadoAudiencias = () => async (dispatch: Dispatch) => {
  const data = await estadoAudienciaService.select()
  dispatch(setEstadoAudienciasList(data))
}
