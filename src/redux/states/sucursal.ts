import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type ISucursalDataGrid } from '../../models/sucursal'

export interface SucursalState {
  data: ISucursalDataGrid[]
}

const initialState: SucursalState = {
  data: []
}

export const sucursalSlice = createSlice({
  name: 'sucursal',
  initialState,
  reducers: {
    setSucursalDataGrid: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload
    }
  }
})

export const { setSucursalDataGrid } = sucursalSlice.actions

export default sucursalSlice.reducer
