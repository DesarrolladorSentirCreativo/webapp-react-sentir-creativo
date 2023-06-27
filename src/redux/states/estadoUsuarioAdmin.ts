import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import { type IEstadoUserAdminSelect } from '../../models'
import estadoUserAdminService from '../../services/estadoUserAdmin.service'

export interface EstadoUserAdminState {
  listSelect: IEstadoUserAdminSelect[]
}

const initialState: EstadoUserAdminState = {
  listSelect: []
}

export const estadoUserAdminSlice = createSlice({
  name: 'estadoUserAdmin',
  initialState,
  reducers: {
    setEstadoUserAdminsList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setEstadoUserAdminsList } = estadoUserAdminSlice.actions

export default estadoUserAdminSlice.reducer

export const fetchEstadoUserAdmins = () => async (dispatch: Dispatch) => {
  const data = await estadoUserAdminService.select()
  dispatch(setEstadoUserAdminsList(data))
}
