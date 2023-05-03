import { Box } from '@mui/material'
import CustomStore from 'devextreme/data/custom_store'
import { Column, Lookup } from 'devextreme-react/data-grid'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, DataGridCustom } from '../../components/Controls'
import {
  useAntiguedad,
  useCercania,
  useEstadoAudiencia,
  useMotivacion,
  useOrganizacion,
  useOrigen,
  usePrefijo
} from '../../hooks'
import { type Audiencia, type SelectEstadoAudiencia } from '../../models'
import audienciaService from '../../services/audiencia.service'

const Audiencias: React.FC = () => {
  const [audienciasStore, setAudienciasStore] = useState<any>()
  const { loadOrganizaciones, organizaciones } = useOrganizacion()
  const { loadOrigenes, origenes } = useOrigen()
  const { loadPrefijos, prefijos } = usePrefijo()
  const { loadCercanias, cercanias } = useCercania()
  const { loadEstadoAudiencias, estadoAudiencias } = useEstadoAudiencia()
  const { loadAntiguedades, antiguedades } = useAntiguedad()
  const { loadMotivaciones, motivaciones } = useMotivacion()
  const [buttonAddGrid, setButtonAddGrid] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    load()
    loadData()
  }, [])

  const loadData = async (): Promise<void> => {
    try {
      setButtonAddGrid({
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'add',
          onClick: () => {
            navigate('/audiencias/nuevo')
          }
        }
      })
      setAudienciasStore(
        new CustomStore({
          key: 'id',
          load: async () => await loadDataGrid(),
          remove: (key) => deleteRegister(Number(key))
        })
      )
    } catch (error) {
      console.log('Mi error', error)
    }
  }

  const loadDataGrid = async (): Promise<any> => {
    const data = await audienciaService.getAll()

    const newData = data.map((item) => {
      const newItem: any = {}

      Object.keys(item).forEach((key) => {
        const value = item[key]

        if (value !== null && value !== undefined) {
          newItem[key] = String(value)
        } else {
          newItem[key] = ''
        }
      })

      return newItem
    })

    return newData
  }

  const load = async (): Promise<void> => {
    await loadOrigenes()
    await loadPrefijos()
    await loadCercanias()
    await loadOrganizaciones()
    await loadEstadoAudiencias()
    await loadAntiguedades()
    await loadMotivaciones()
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
          addButton={buttonAddGrid}
          pageSize={10}
          columnCount={'nombre'}
          adding={false}
          stateStoring={{
            enabled: true,
            type: 'localStorage',
            storageKey: 'myApp.gridAudiencias',
            savingTimeout: 2000,
            customLoad: function () {
              return JSON.parse(
                localStorage.getItem('myApp.gridAudiencias') ?? ''
              )
            },
            customSave: function (gridState: any) {
              localStorage.setItem(
                'myApp.gridAudiencias',
                JSON.stringify(gridState)
              )
            }
          }}
        >
          <Column dataField="id" caption="ID" />
          <Column
            dataField="estadoId"
            caption="Estado Audiencia"
            cellRender={renderCell}
            allowSearch={true}
          />
          <Column
            dataField="nombre"
            caption="Nombre"
            dataType={'text'}
            allowEditing={false}
            allowSearch={true}
            allowFiltering={true}
          />
          <Column
            dataField="apellido"
            caption="Apellidos"
            dataType={'text'}
            allowEditing={false}
            allowSearch={true}
            allowFiltering={true}
          />
          <Column
            dataField="organizacionId"
            caption="Organizacion"
            allowFiltering={true}
            allowSearch={true}
          >
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
            allowFiltering={true}
            allowSearch={true}
          />
          <Column
            dataField="email"
            caption="Email"
            dataType={'text'}
            allowEditing={false}
            allowFiltering={true}
            allowSearch={true}
          />
          <Column
            dataField="documentoIdentidad"
            caption="Documento Identidad"
            dataType={'text'}
            allowEditing={false}
            allowFiltering={true}
            allowSearch={true}
          />
          <Column
            dataField="profesion"
            caption="Profesión"
            dataType={'text'}
            allowEditing={false}
            allowFiltering={true}
            allowSearch={true}
          />
          <Column
            dataField="origenId"
            caption="Origen"
            allowFiltering={true}
            allowSearch={true}
          >
            <Lookup dataSource={origenes} valueExpr="id" displayExpr="nombre" />
          </Column>
          <Column
            dataField="prefijoId"
            caption="Prefijo"
            allowFiltering={true}
            allowSearch={true}
          >
            <Lookup dataSource={prefijos} valueExpr="id" displayExpr="nombre" />
          </Column>
          <Column
            dataField="cercaniaId"
            caption="Cercania"
            allowFiltering={true}
            allowSearch={true}
          >
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
            allowFiltering={true}
            allowSearch={true}
          />
          <Column
            dataField="antiguedadId"
            caption="Antiguedad"
            allowFiltering={true}
            allowSearch={true}
          >
            <Lookup
              dataSource={antiguedades}
              valueExpr="id"
              displayExpr="nombre"
            />
          </Column>
          <Column
            dataField="motivacionId"
            caption="Motivación"
            allowFiltering={true}
            allowSearch={true}
          >
            <Lookup
              dataSource={motivaciones}
              valueExpr="id"
              displayExpr="nombre"
            />
          </Column>
        </DataGridCustom>
      </Box>
    </Card>
  )
}

export default Audiencias
