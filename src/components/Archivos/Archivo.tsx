import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { type IArchivo } from '../../models/archivo'
import { type ITipoArchivo } from '../../models/tipoArchivos'
import tipoArchivoService from '../../services/tipoArchivo.service'
import ArchivoCard from './ArchivoCard'
import ModalArchivo from './ModalArchivo'

interface IArchivoProps {
  archivos: IArchivo[]
  audienciaId: number
  addArchivo: (archivo: IArchivo) => void
}

const archivoForm: IArchivo = {
  id: 0,
  nombre: '',
  path: '',
  tipoArchivo: '',
  publishedAt: new Date(),
  tipoArchivoId: 0,
  publico: false
}
const Archivo: React.FC<IArchivoProps> = (props: IArchivoProps) => {
  const { archivos, audienciaId, addArchivo } = props
  const [open, setOpen] = useState<boolean>(false)
  const [archivo, setArchivo] = useState<IArchivo>(archivoForm)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tipoArchivos, setTipoArchivos] = useState<ITipoArchivo[]>([])

  useEffect(() => {
    load()
  }, [])

  const load = async (): Promise<void> => {
    const data = await tipoArchivoService.select()
    setTipoArchivos(data)
  }

  const handleOpen = (): void => {
    setOpen(true)
    setArchivo(archivoForm)
  }

  const handleClose = (): void => {
    setOpen(false)
    setArchivo(archivoForm)
  }

  const handleIsLoading = (): void => {
    setIsLoading(true)
  }

  const handleCloseLoading = (): void => {
    setIsLoading(false)
  }
  return (
    <>
      <Grid
        container
        spacing={1}
        style={{ marginBottom: 16 }}
        padding={2}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginLeft: 1
        }}
      >
        <Typography component="legend" variant="h6" paragraph>
          Archivos
        </Typography>
        <Tooltip title="Crear Archivo">
          <IconButton
            color="primary"
            onClick={() => {
              handleOpen()
            }}
            sx={{ marginTop: '-16px' }}
          >
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
        <ArchivoCard archivos={archivos} />
      </Grid>
      <ModalArchivo
        addArchivo={addArchivo}
        archivo={archivo}
        tipoArchivos={tipoArchivos}
        open={open}
        isLoading={isLoading}
        onClose={handleClose}
        handleIsLoading={handleIsLoading}
        audienciaId={audienciaId}
        closeLoading={handleCloseLoading}
      />
    </>
  )
}

export default Archivo
