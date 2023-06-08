import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import { type IRolSelect } from '../../models'
import rolService from '../../services/rol.service'

export interface RolState {
  listSelect: IRolSelect[]
}

const initialState: RolState = {
  listSelect: []
}

export const rolesSlice = createSlice({
  name: 'rol',
  initialState,
  reducers: {
    setRolesList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setRolesList } = rolesSlice.actions

export default rolesSlice.reducer

export const fetchRoles = () => async (dispatch: Dispatch) => {
  const data = await rolService.select()
  dispatch(setRolesList(data))
}
