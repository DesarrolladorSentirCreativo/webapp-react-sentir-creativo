import { configureStore } from '@reduxjs/toolkit'

import antiguedadReducer from './states/antiguedad'
import cercaniaReducer from './states/cercania'
import estadoAudienciaReducer from './states/estadoAudiencia'
import organizacionReducer from './states/organizacion'

const store = configureStore({
  reducer: {
    estadoAudiencia: estadoAudienciaReducer,
    organizacion: organizacionReducer,
    antiguedad: antiguedadReducer,
    cercania: cercaniaReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
