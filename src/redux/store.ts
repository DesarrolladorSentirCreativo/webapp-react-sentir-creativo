import { configureStore } from '@reduxjs/toolkit'

import acuerdoUserAdminReducer from './states/acuerdoUserAdmin'
import afpReducer from './states/afp'
import antiguedadReducer from './states/antiguedad'
import categoriaPrivilegioReducer from './states/categoriaPrivilegio'
import categoriaUserAdminReducer from './states/categoriaUserAdmin'
import cercaniaReducer from './states/cercania'
import coleccionUserAdminReducer from './states/coleccionUserAdmin'
import cuponDescuentoReducer from './states/cuponDescuento'
import difusionReducer from './states/difusion'
import direccionReducer from './states/direccion'
import estadoAudienciaReducer from './states/estadoAudiencia'
import modoTrabajoReducer from './states/modoTrabajo'
import motivacionReducer from './states/motivacion'
import organizacionReducer from './states/organizacion'
import origenReducer from './states/origen'
import prefijoReducer from './states/prefijo'
import previsionReducer from './states/prevision'
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
    rol: rolReducer,
    categoriaUserAdmin: categoriaUserAdminReducer,
    afp: afpReducer,
    prevision: previsionReducer,
    modoTrabajo: modoTrabajoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
