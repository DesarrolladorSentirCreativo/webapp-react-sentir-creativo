import { createSlice, type Dispatch, type PayloadAction } from '@reduxjs/toolkit'

import { type SelectCuponDescuento } from '../../models'
import cuponDescuentoService from '../../services/cuponDescuento.service'

export interface CuponDescuentoState {
  listSelect: SelectCuponDescuento[]
}

const initialState: CuponDescuentoState = {
  listSelect: []
}

export const cuponDescuentosSlice = createSlice({
  name: 'cuponDescuento',
  initialState,
  reducers: {
    setCuponDescuentosList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setCuponDescuentosList } = cuponDescuentosSlice.actions

export default cuponDescuentosSlice.reducer

export const fetchCuponDescuentos = () => async (dispatch: Dispatch) => {
  const data = await cuponDescuentoService.select()
  dispatch(setCuponDescuentosList(data))
}
