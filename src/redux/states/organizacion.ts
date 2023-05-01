import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import {
  type OrganizacionDataGrid,
  type SelectOrganizacion
} from '../../models'
import organizacionService from '../../services/organizacion.service'

export interface OrganizacionState {
  listSelect: SelectOrganizacion[]
  data: OrganizacionDataGrid[]
}

const initialState: OrganizacionState = {
  listSelect: [],
  data: []
}

export const organizacionSlice = createSlice({
  name: 'organizacion',
  initialState,
  reducers: {
    setOrganizacionesList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    },
    setOrganizacionDataGrid: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload
    }
  }
})

export const { setOrganizacionesList, setOrganizacionDataGrid } =
  organizacionSlice.actions

export default organizacionSlice.reducer

export const fetchOrganizaciones = () => async (dispatch: Dispatch) => {
  const data = await organizacionService.select()
  dispatch(setOrganizacionesList(data))
}
