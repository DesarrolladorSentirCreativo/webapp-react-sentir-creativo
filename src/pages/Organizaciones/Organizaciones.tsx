import { Box } from '@mui/material'
import CustomStore from 'devextreme/data/custom_store'
import { Button, Column, Lookup } from 'devextreme-react/data-grid'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Card, DataGridCustom } from '../../components/Controls'
import { useNotification } from '../../context'
import { useRubro } from '../../hooks'
import { setOrganizacionDataGrid } from '../../redux/states/organizacion'
import organizacionService from '../../services/organizacion.service'

const Organizaciones: React.FC = () => {
  const { rubros, loadRubros } = useRubro()
  const dispatch = useDispatch()
  const [organizacionesStore, setOrganizacionesStore] = useState<any>()
  const [buttonAddGrid, setButtonAddGrid] = useState<object>({})
  const navigate = useNavigate()
  const { getError, getSuccess } = useNotification()

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
          load: async () => await loadDataGrid(),
          remove: (key) => deleteRegister(Number(key))
        })
      )
    } catch (error) {
      console.log('Mi error', error)
    }
  }

  const loadDataGrid = async (): Promise<any> => {
    const data = await organizacionService.getAll()
    dispatch(setOrganizacionDataGrid(data))
    return data
  }

  const deleteRegister = (id: number): any => {
    try {
      const data = organizacionService.deleteById(id)
      getSuccess('La organización fue eliminada correctamente')
      return data
    } catch (error) {
      console.log('Mi error', error)
      getError('La organización no pudo ser eliminada')
    }
  }

  return (
    <Card title={'Listado de Organizaciones'}>
      <Box width="100%" display="flex" flexWrap={'wrap'}>
        <DataGridCustom
          dataStore={organizacionesStore}
          updating={true}
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
          <Column dataField="id" caption="ID" allowSearch={true} />
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
            allowSearch={true}
          />
          <Column
            dataField="email"
            caption="Email"
            dataType={'text'}
            allowEditing={false}
            allowSearch={true}
          />
          <Column
            dataField="website"
            caption="Sitio Web"
            dataType={'text'}
            allowEditing={false}
            allowSearch={true}
          />
          <Column
            dataField="twitter"
            caption="Twitter"
            dataType={'text'}
            allowEditing={false}
            allowSearch={true}
          />
          <Column
            dataField="facebook"
            caption="Facebook"
            dataType={'text'}
            allowEditing={false}
            allowSearch={true}
          />
          <Column
            dataField="instagram"
            caption="Instagram"
            dataType={'text'}
            allowEditing={false}
            allowSearch={true}
          />
          <Column
            dataField="historial"
            caption="Historial"
            dataType={'text'}
            allowEditing={false}
            allowSearch={true}
          />
          <Column type="buttons" width={110}>
            <Button
              name="edit"
              onClick={(e: any) => {
                navigate(`/organizaciones/actualizar/${e.row.data.id}`)
              }}
            />
            <Button name="delete" />
          </Column>
        </DataGridCustom>
      </Box>
    </Card>
  )
}

export default Organizaciones
