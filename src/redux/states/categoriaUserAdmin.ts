import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import { type ICategoriaUserAdminSelect } from '../../models'
import categoriaUserAdminService from '../../services/categoriaUserAdmin.service'

export interface CategoriaUserAdminState {
  listSelect: ICategoriaUserAdminSelect[]
}

const initialState: CategoriaUserAdminState = {
  listSelect: []
}

export const categoriaUserAdminsSlice = createSlice({
  name: 'categoriaUserAdmin',
  initialState,
  reducers: {
    setCategoriaUserAdminsList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setCategoriaUserAdminsList } = categoriaUserAdminsSlice.actions

export default categoriaUserAdminsSlice.reducer

export const fetchCategoriaUserAdmins = () => async (dispatch: Dispatch) => {
  const data = await categoriaUserAdminService.select()
  dispatch(setCategoriaUserAdminsList(data))
}
