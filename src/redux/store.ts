import { configureStore } from '@reduxjs/toolkit'

import acuerdoUserAdminReducer from './states/acuerdoUserAdmin'
import antiguedadReducer from './states/antiguedad'
import categoriaPrivilegioReducer from './states/categoriaPrivilegio'
import cercaniaReducer from './states/cercania'
import coleccionUserAdminReducer from './states/coleccionUserAdmin'
import cuponDescuentoReducer from './states/cuponDescuento'
import difusionReducer from './states/difusion'
import direccionReducer from './states/direccion'
import estadoAudienciaReducer from './states/estadoAudiencia'
import motivacionReducer from './states/motivacion'
import organizacionReducer from './states/organizacion'
import origenReducer from './states/origen'
import prefijoReducer from './states/prefijo'
import rolReducer from './states/rol'
import rubroReducer from './states/rubro'
import sucursalReducer from './states/sucursal'

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
    prefijo: prefijoReducer,
    rubro: rubroReducer,
    direccion: direccionReducer,
    sucursal: sucursalReducer,
    categoriaPrivilegio: categoriaPrivilegioReducer,
    coleccionUserAdmin: coleccionUserAdminReducer,
    acuerdoUserAdmin: acuerdoUserAdminReducer,
    rol: rolReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
