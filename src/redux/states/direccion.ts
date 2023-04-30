import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import {
  type SelectCiudad,
  type SelectPais,
  type SelectRegion
} from '../../models'
import direccionService from '../../services/direccion.service'

export interface DireccionState {
  listSelectRegion: SelectRegion[]
  listSelectCiudad: SelectCiudad[]
  listSelectPais: SelectPais[]
}

const initialState: DireccionState = {
  listSelectRegion: [],
  listSelectCiudad: [],
  listSelectPais: []
}

export const direccionesSlice = createSlice({
  name: 'direccion',
  initialState,
  reducers: {
    setPaisesList: (state, action: PayloadAction<any[]>) => {
      state.listSelectPais = action.payload
    },
    setRegionesList: (state, action: PayloadAction<any[]>) => {
      state.listSelectRegion = action.payload
    },
    setCiudadesList: (state, action: PayloadAction<any[]>) => {
      state.listSelectCiudad = action.payload
    }
  }
})

export const { setCiudadesList, setRegionesList, setPaisesList } =
  direccionesSlice.actions

export default direccionesSlice.reducer

export const fetchPaises = () => async (dispatch: Dispatch) => {
  const data = await direccionService.selectPais()
  dispatch(setPaisesList(data))
}

export const fetchRegiones = () => async (dispatch: Dispatch) => {
  const data = await direccionService.selectRegion()
  dispatch(setRegionesList(data))
}

export const fetchCiudades = () => async (dispatch: Dispatch) => {
  const data = await direccionService.selectCiudad()
  dispatch(setCiudadesList(data))
}
