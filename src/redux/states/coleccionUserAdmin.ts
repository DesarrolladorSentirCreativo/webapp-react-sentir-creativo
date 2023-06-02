import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import { type IColeccionUserAdminSelect } from '../../models'
import coleccionUserAdminService from '../../services/coleccionUserAdmin.service'

export interface ColeccionUserAdminState {
  listSelect: IColeccionUserAdminSelect[]
}

const initialState: ColeccionUserAdminState = {
  listSelect: []
}

export const coleccionUserAdminsSlice = createSlice({
  name: 'coleccionUserAdmin',
  initialState,
  reducers: {
    setColeccionUserAdminsList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setColeccionUserAdminsList } = coleccionUserAdminsSlice.actions

export default coleccionUserAdminsSlice.reducer

export const fetchColeccionUserAdmins = () => async (dispatch: Dispatch) => {
  const data = await coleccionUserAdminService.select()
  dispatch(setColeccionUserAdminsList(data))
}
