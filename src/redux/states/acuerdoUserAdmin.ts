import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import { type ISelectAcuerdoUserAdmin } from '../../models'
import acuerdoUserAdminService from '../../services/acuerdoUserAdmin.service'

export interface AcuerdoUserAdminState {
  listSelect: ISelectAcuerdoUserAdmin[]
}

const initialState: AcuerdoUserAdminState = {
  listSelect: []
}

export const acuerdoUserAdminsSlice = createSlice({
  name: 'acuerdoUserAdmin',
  initialState,
  reducers: {
    setAcuerdoUserAdminsList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setAcuerdoUserAdminsList } = acuerdoUserAdminsSlice.actions

export default acuerdoUserAdminsSlice.reducer

export const fetchAcuerdoUserAdmins = () => async (dispatch: Dispatch) => {
  const data = await acuerdoUserAdminService.select()
  dispatch(setAcuerdoUserAdminsList(data))
}
