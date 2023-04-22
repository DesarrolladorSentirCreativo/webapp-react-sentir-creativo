import { Box } from '@mui/material'
import CustomStore from 'devextreme/data/custom_store'
import { Column, Lookup } from 'devextreme-react/data-grid'
import React, { useEffect, useState } from 'react'

import { Card, DataGridCustom } from '../../components/Controls'
import { useCercania } from '../../hooks/useCercania'
import { useEstadoAudiencia } from '../../hooks/useEstadoAudiencia'
import { useOrganizacion } from '../../hooks/useOrganizacion'
import { useOrigen } from '../../hooks/useOrigen'
import { usePrefijo } from '../../hooks/usePrefijo'
import { type SelectEstadoAudiencia } from '../../models'
import audienciaService from '../../services/audiencia.service'

const Audiencias: React.FC = () => {
  const [audienciasStore, setAudienciasStore] = useState<any>()
  const { loadOrganizaciones, organizaciones } = useOrganizacion()
  const { loadOrigenes, origenes } = useOrigen()
  const { loadPrefijos, prefijos } = usePrefijo()
  const { loadCercanias, cercanias } = useCercania()
  const { loadEstadoAudiencias, estadoAudiencias } = useEstadoAudiencia()

  useEffect(() => {
    load()
    loadData()
  }, [])

  const loadData = async (): Promise<void> => {
    try {
      setAudienciasStore(
        new CustomStore({
          key: 'id',
          load: () => loadDataGrid(),
          remove: (key) => deleteRegister(Number(key))
        })
      )
    } catch (error) {
      console.log('Mi error', error)
    }
  }

  const loadDataGrid = (): any => {
    return audienciaService.getAll()
  }

  const load = async (): Promise<void> => {
    await loadOrigenes()
    await loadPrefijos()
    await loadCercanias()
    await loadOrganizaciones()
    await loadEstadoAudiencias()
  }

  const deleteRegister = (id: number): any => {
    return audienciaService.deleteById(id)
  }

  const getEstadoById = (id: number): SelectEstadoAudiencia | undefined => {
    return estadoAudiencias.find((estado) => estado.id === id)
  }

  const renderCell = (cellData: any): any => {
    const selectedValue = cellData.value
    const estado = getEstadoById(selectedValue)
    const color = estado ? estado.color : 'black'
    return (
      estado && (
        <span
          style={{
            background: color,
            color: '#fff',
            padding: '3px',
            borderRadius: '1px'
          }}
        >
          {estado?.nombre}
        </span>
      )
    )
  }

  return (
    <Card title={'Listado de Audiencias'}>
      <Box width="100%" display="flex" flexWrap={'wrap'}>
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
          <Column dataField="id" caption="ID" />
          <Column
            dataField="estadoId"
            caption="Estado Audiencia"
            cellRender={renderCell}
          />
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
          <Column dataField="organizacionId" caption="Organizacion">
            <Lookup
              dataSource={organizaciones}
              valueExpr="id"
              displayExpr="nombre"
            />
          </Column>
          <Column
            dataField="celular"
            caption="Telefono"
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
          <Column dataField="origenId" caption="Origen">
            <Lookup dataSource={origenes} valueExpr="id" displayExpr="nombre" />
          </Column>
          <Column dataField="prefijoId" caption="Prefijo">
            <Lookup dataSource={prefijos} valueExpr="id" displayExpr="nombre" />
          </Column>
          <Column dataField="cercaniaId" caption="Cercania">
            <Lookup
              dataSource={cercanias}
              valueExpr="id"
              displayExpr="nombre"
            />
          </Column>
          <Column
            dataField="cargo"
            caption="Cargo"
            dataType={'text'}
            allowEditing={false}
          />
        </DataGridCustom>
      </Box>
    </Card>
  )
}

export default Audiencias
