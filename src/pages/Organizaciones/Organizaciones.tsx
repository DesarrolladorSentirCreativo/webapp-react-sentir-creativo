import { Box } from '@mui/material'
import CustomStore from 'devextreme/data/custom_store'
import { Column, Lookup } from 'devextreme-react/data-grid'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, DataGridCustom } from '../../components/Controls'
import { useRubro } from '../../hooks'
import organizacionService from '../../services/organizacion.service'

const Organizaciones: React.FC = () => {
  const { rubros, loadRubros } = useRubro()
  const [organizacionesStore, setOrganizacionesStore] = useState<any>()
  const [buttonAddGrid, setButtonAddGrid] = useState<object>({})
  const navigate = useNavigate()

  useEffect(() => {
    loadRubros()
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
            navigate('/organizaciones/nuevo')
          }
        }
      })
      setOrganizacionesStore(
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
    return organizacionService.getAll()
  }

  const deleteRegister = (id: number): any => {
    console.log(id)
  }

  return (
    <Card title={'Listado de Organizaciones'}>
      <Box width="100%" display="flex" flexWrap={'wrap'}>
        <DataGridCustom
          dataStore={organizacionesStore}
          updating={false}
          deleting={true}
          addButton={buttonAddGrid}
          pageSize={10}
          columnCount={'nombre'}
          adding={false}
          stateStoring={{
            enabled: true,
            type: 'localStorage',
            storageKey: 'myApp.gridOrganizaciones',
            savingTimeout: 2000,
            customLoad: function () {
              return JSON.parse(
                localStorage.getItem('myApp.gridOrganizaciones') ?? ''
              )
            },
            customSave: function (gridState: any) {
              localStorage.setItem(
                'myApp.gridOrganizaciones',
                JSON.stringify(gridState)
              )
            }
          }}
        >
          <Column dataField="id" caption="ID" />
          <Column
            dataField="nombre"
            caption="Nombre"
            dataType={'text'}
            allowEditing={false}
            allowSearch={true}
          />
          <Column dataField="rubroId" caption="Rubro">
            <Lookup dataSource={rubros} valueExpr="id" displayExpr="nombre" />
          </Column>
          <Column
            dataField="telefono"
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
            dataField="website"
            caption="Sitio Web"
            dataType={'text'}
            allowEditing={false}
          />
          <Column
            dataField="twitter"
            caption="Twitter"
            dataType={'text'}
            allowEditing={false}
          />
          <Column
            dataField="facebook"
            caption="Facebook"
            dataType={'text'}
            allowEditing={false}
          />
          <Column
            dataField="instagram"
            caption="Instagram"
            dataType={'text'}
            allowEditing={false}
          />
          <Column
            dataField="historial"
            caption="Historial"
            dataType={'text'}
            allowEditing={false}
          />
        </DataGridCustom>
      </Box>
    </Card>
  )
}

export default Organizaciones
