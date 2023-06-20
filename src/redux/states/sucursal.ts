import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import {
  type ISelectSucursal,
  type ISucursalDataGrid
} from '../../models/sucursal'
import sucursalService from '../../services/sucursal.service'

export interface SucursalState {
  data: ISucursalDataGrid[]
  select: ISelectSucursal[]
}

const initialState: SucursalState = {
  data: [],
  select: []
}

export const sucursalSlice = createSlice({
  name: 'sucursal',
  initialState,
  reducers: {
    setSucursalDataGrid: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload
    },
    setSelectSucursal: (state, action: PayloadAction<any[]>) => {
      state.select = action.payload
    }
  }
})

export const { setSucursalDataGrid, setSelectSucursal } = sucursalSlice.actions

export default sucursalSlice.reducer

export const fetchSucursales = () => async (dispatch: Dispatch) => {
  const data = await sucursalService.select()
  dispatch(setSelectSucursal(data))
}
