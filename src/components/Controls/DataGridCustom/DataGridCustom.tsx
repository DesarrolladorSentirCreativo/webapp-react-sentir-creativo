import MaterialReactTable from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import React from 'react'

export type DensityType = 'compact' | 'normal' | 'comfortable'

interface IDataGridCustom {
  enableRowActions?: boolean
  onDensityChange: (density: any) => void
  onColumnVisibilityChange: (visibility: object) => void
  renderTopToolbarCustomActions?: () => JSX.Element
  renderRowActions?: ({ row, table }: any) => JSX.Element
  columns: any[]
  data: any[]
  initialState?: any
  state: any
}

const DataGridCustom: React.FC<IDataGridCustom> = (props: IDataGridCustom) => {
  const {
    enableRowActions,
    onDensityChange,
    onColumnVisibilityChange,
    renderTopToolbarCustomActions,
    renderRowActions,
    columns,
    data,
    state,
    initialState
  } = props

  return (
    <MaterialReactTable
      localization={MRT_Localization_ES}
      enableRowActions={enableRowActions}
      enableColumnActions={false}
      onDensityChange={onDensityChange}
      onColumnVisibilityChange={onColumnVisibilityChange}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
      renderRowActions={renderRowActions}
      columns={columns}
      data={data}
      initialState={initialState}
      state={state}
      muiTableProps={{
        sx: {
          width: '100%'
        }
      }}
      muiTableFooterProps={{
        sx: (theme) => ({
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.paper
        })
      }}
      muiTableHeadCellColumnActionsButtonProps={{
        sx: (theme) => ({
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.paper
        })
      }}
      muiTableBodyCellProps={{
        sx: (theme) => ({
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.paper
        })
      }}
      muiTableHeadCellProps={{
        sx: (theme) => ({
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.paper
        })
      }}
    />
  )
}

export default DataGridCustom
