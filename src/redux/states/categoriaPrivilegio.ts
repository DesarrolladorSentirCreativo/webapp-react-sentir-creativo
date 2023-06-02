import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import { type ICategoriaPrivilegioSelect } from '../../models'
import categoriaPrivilegioService from '../../services/categoriaPrivilegio.service'

export interface CategoriaPrivilegioState {
  listSelect: ICategoriaPrivilegioSelect[]
}

const initialState: CategoriaPrivilegioState = {
  listSelect: []
}

export const categoriaPrivilegiosSlice = createSlice({
  name: 'categoriaPrivilegio',
  initialState,
  reducers: {
    setCategoriaPrivilegiosList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setCategoriaPrivilegiosList } = categoriaPrivilegiosSlice.actions

export default categoriaPrivilegiosSlice.reducer

export const fetchCategoriaPrivilegios = () => async (dispatch: Dispatch) => {
  const data = await categoriaPrivilegioService.select()
  dispatch(setCategoriaPrivilegiosList(data))
}
