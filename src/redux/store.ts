import { configureStore } from '@reduxjs/toolkit'

import antiguedadReducer from './states/antiguedad'
import cercaniaReducer from './states/cercania'
import cuponDescuentoReducer from './states/cuponDescuento'
import difusionReducer from './states/difusion'
import estadoAudienciaReducer from './states/estadoAudiencia'
import motivacionReducer from './states/motivacion'
import organizacionReducer from './states/organizacion'
import origenReducer from './states/origen'
import prefijoReducer from './states/prefijo'

const store = configureStore({
  reducer: {
    estadoAudiencia: estadoAudienciaReducer,
    organizacion: organizacionReducer,
    antiguedad: antiguedadReducer,
    cercania: cercaniaReducer,
    difusion: difusionReducer,
    cuponDescuento: cuponDescuentoReducer,
    motivacion: motivacionReducer,
    origen: origenReducer,
    prefijo: prefijoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
