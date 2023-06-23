import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import { type ISelectUsuarioAdmin } from '../../models'
import userAdminService from '../../services/userAdmin.service'

export interface UsuarioAdminState {
  listSelect: ISelectUsuarioAdmin[]
}

const initialState: UsuarioAdminState = {
  listSelect: []
}

export const usuariosAdminsSlice = createSlice({
  name: 'usuarioAdmin',
  initialState,
  reducers: {
    setUsuariosAdminsList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setUsuariosAdminsList } = usuariosAdminsSlice.actions

export default usuariosAdminsSlice.reducer

export const fetchUsuariosAdmins = () => async (dispatch: Dispatch) => {
  const data = await userAdminService.select()
  dispatch(setUsuariosAdminsList(data))
}
