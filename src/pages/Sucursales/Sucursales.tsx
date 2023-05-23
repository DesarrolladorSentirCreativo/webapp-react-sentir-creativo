import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, IconButton } from '@mui/material'
import { type MRT_ColumnDef } from 'material-react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, DataGridCustom } from '../../components/Controls'
import {
  getLocalStorage,
  setLocalStorage
} from '../../helpers/localstorage.helper'
import { useDireccion } from '../../hooks'
import { type ISucursalDataGrid } from '../../models/sucursal'
import sucursalService from '../../services/sucursal.service'

const Sucursales: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<ISucursalDataGrid[]>([])
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const sucursalesPreferences = getLocalStorage('sucursalesPreferences')
    const result = sucursalesPreferences
      ? JSON.parse(sucursalesPreferences)
      : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const sucursalesPreferences = getLocalStorage('sucursalesPreferences')
    const result = sucursalesPreferences
      ? JSON.parse(sucursalesPreferences)
      : 'compact'
    return result.density
  })
  const { paises, loadPaises, loadRegiones, regiones, loadCiudades, ciudades } =
    useDireccion()

  const columns = useMemo<Array<MRT_ColumnDef<ISucursalDataGrid>>>(
    () => [
      {
        accessorKey: 'id',
        enableHiding: true,
        header: 'ID',
        size: 10
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre',
        minSize: 300,
        maxSize: 300,
        size: 300
      },
      {
        accessorKey: 'direccion',
        header: 'Direccion',
        minSize: 480,
        maxSize: 480,
        size: 480
      },
      {
        accessorKey: 'ciudadId',
        enableHiding: true,
        header: 'Ciudad',
        minSize: 220,
        maxSize: 220,
        size: 220,
        Cell: ({ cell, row }) => {
          const value = ciudades.find(
            (ciudad) => ciudad.id === row.original.ciudadId
          )
          return (
            <span
              style={{
                padding: '2px',
                borderRadius: '1px',
                display: 'flex',
                alignItems: 'left',
                justifyContent: 'left'
              }}
            >
              {value?.nombre}
            </span>
          )
        }
      },
      {
        accessorKey: 'regionId',
        enableHiding: true,
        header: 'Región',
        minSize: 200,
        maxSize: 200,
        size: 200,
        Cell: ({ cell, row }) => {
          const value = regiones.find(
            (region) => region.id === row.original.regionId
          )
          return (
            <span
              style={{
                padding: '2px',
                borderRadius: '1px',
                display: 'flex',
                alignItems: 'left',
                justifyContent: 'left'
              }}
            >
              {value?.nombre}
            </span>
          )
        }
      },
      {
        accessorKey: 'paisId',
        enableHiding: true,
        header: 'País',
        minSize: 200,
        maxSize: 200,
        size: 200,
        Cell: ({ cell, row }) => {
          const value = paises.find((pais) => pais.id === row.original.paisId)
          return (
            <span
              style={{
                padding: '2px',
                borderRadius: '1px',
                display: 'flex',
                alignItems: 'left',
                justifyContent: 'left'
              }}
            >
              {value?.nombre}
            </span>
          )
        }
      }
    ],
    [data]
  )

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    const sucursalesPreferences = getLocalStorage('sucursalesPreferences')
    const result = sucursalesPreferences
      ? JSON.parse(sucursalesPreferences)
      : 'compact'

    if (result.density !== density) {
      setLocalStorage('sucursalesPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const sucursalesPreferences = getLocalStorage('sucursalesPreferences')
    const result = sucursalesPreferences
      ? JSON.parse(sucursalesPreferences)
      : {}

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('sucursalesPreferences', {
        density: result.density,
        columnVisibility
      })
    }
  }, [columnVisibility])

  const fetchData = async (): Promise<void> => {
    const result = await sucursalService.getAll()
    await loadCiudades()
    await loadPaises()
    await loadRegiones()
    setData(result)
  }

  const load = async (): Promise<void> => {
    setIsLoading(true)
    await fetchData()
    setIsLoading(false)
  }

  return (
    <Card title={'Listado de Sucursales'}>
      <Box width="100%" display="flex" flexDirection="column">
        <DataGridCustom
          data={data}
          columns={columns}
          enableRowActions={true}
          onColumnVisibilityChange={setColumnVisibility}
          onDensityChange={setDensity}
          renderTopToolbarCustomActions={() => (
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                navigate('/sucursales/nuevo')
              }}
              variant="contained"
            >
              Crear Nuevo Registro
            </Button>
          )}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              <IconButton
                color="secondary"
                onClick={() => {
                  navigate(`/sucursales/actualizar/${row.original.id}`)
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  console.log('error')
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          initialState={{}}
          state={{
            isLoading,
            columnVisibility,
            density
          }}
        />
      </Box>
    </Card>
  )
}

export default Sucursales
