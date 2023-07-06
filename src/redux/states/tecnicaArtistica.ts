import {
  createSlice,
  type Dispatch,
  type PayloadAction
} from '@reduxjs/toolkit'

import { type ISelectTecnicaArtistica } from '../../models'
import tecnicaArtisticaService from '../../services/tecnicaArtistica.service'

export interface TecnicaArtisticaState {
  listSelect: ISelectTecnicaArtistica[]
}

const initialState: TecnicaArtisticaState = {
  listSelect: []
}

export const tecnicaArtisticaSlice = createSlice({
  name: 'tecnicaArtistica',
  initialState,
  reducers: {
    setTecnicasArtisticasList: (state, action: PayloadAction<any[]>) => {
      state.listSelect = action.payload
    }
  }
})

export const { setTecnicasArtisticasList } = tecnicaArtisticaSlice.actions

export default tecnicaArtisticaSlice.reducer

export const fetchTecnicasArtisticas = () => async (dispatch: Dispatch) => {
  const data = await tecnicaArtisticaService.select()
  dispatch(setTecnicasArtisticasList(data))
}
