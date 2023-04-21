import {
  Box
} from '@mui/material'
import CustomStore from 'devextreme/data/custom_store'
import { Button, Column } from 'devextreme-react/data-grid'
import React, { useEffect, useState } from 'react'

import { Card, DataGridCustom } from '../../components/Controls'
import audienciaService from '../../services/audiencia.service'

const Audiencias: React.FC = () => {
  const [audienciasStore, setAudienciasStore] = useState<any>()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async (): Promise<void> => {
    try {
      setAudienciasStore(
        new CustomStore({
          key: 'id',
          load: async () => await loadDataGrid()
        })
      )
    } catch (error) {
      console.log('Mi error', error)
    }
  }

  const loadDataGrid = async (): Promise<any> => {
    console.log('loadDataGrid')
    return await audienciaService.getAll()
  }

  return (
        <Card title={'Listado de Audiencias'}>
            <Box width='100%' display='flex' flexWrap={'wrap'}>
               <DataGridCustom
                   dataStore={audienciasStore}
                   updating={false}
                   deleting={true}
                   addButton={null}
                   pageSize={10}
                   columnCount={'nombre'}
                   adding={false}
                   stateStoring={{
                     enabled: true,
                     type: 'localStorage',
                     storageKey: 'myApp.gridState',
                     savingTimeout: 2000,
                     customLoad: function () {
                       return JSON.parse(localStorage.getItem('myApp.gridState') ?? '')
                     },
                     customSave: function (gridState: any) {
                       localStorage.setItem('myApp.gridState', JSON.stringify(gridState))
                     }
                   }}
               >
                   <Column
                       dataField="nombre"
                       caption="Nombre"
                       dataType={'text'}
                       allowEditing={false}
                       allowSearch={true}
                   />
                   <Column
                       dataField="apellido"
                       caption="Apellidos"
                       dataType={'text'}
                       allowEditing={false}
                       allowSearch={true}
                   />
                   <Column
                       dataField="documentoIdentidad"
                       caption="Documento Identidad"
                       dataType={'text'}
                       allowEditing={false}
                   />
                   <Column
                       dataField="profesion"
                       caption="Profesion"
                       dataType={'text'}
                       allowEditing={false}
                   />
                   <Column
                       dataField="email"
                       caption="Email"
                       dataType={'text'}
                       allowEditing={false}
                   />
                   <Column
                       dataField="celular"
                       caption="Celular"
                       dataType={'text'}
                       allowEditing={false}
                   />
                   <Column type="buttons" width={110}>
                       <Button name="edit" />
                       <Button name="delete" />
                   </Column>
               </DataGridCustom>
            </Box>
        </Card>
  )
}

export default Audiencias
