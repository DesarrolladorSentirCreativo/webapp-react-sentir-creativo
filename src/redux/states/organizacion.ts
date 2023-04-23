import { createSlice, type Dispatch, type PayloadAction } from '@reduxjs/toolkit'

import { type SelectOrganizacion } from '../../models'
import organizacionService from '../../services/organizacion.service'

export interface OrganizacionState {
  listSelect: SelectOrganizacion[]
}

const initialState: OrganizacionState = {
  listSelect: []
}

export const organizacionSlice = createSlice({
  name: 'organizacion',
  initialState,
  reducers: {
    setOrganizacionesList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setOrganizacionesList } = organizacionSlice.actions

export default organizacionSlice.reducer

export const fetchOrganizaciones = () => async (dispatch: Dispatch) => {
  const data = await organizacionService.select()
  dispatch(setOrganizacionesList(data))
}
