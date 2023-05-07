import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Button,
  Card as CardMaterial,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import React from 'react'

import { formatDate } from '../../helpers/date.helper'
import { type IComentario } from '../../models'

interface IComentarioProps {
  editing: boolean
  loading: boolean
  comentarios: IComentario[]
  handleOpen: () => void
  handleSetComentario: (value: string) => void
  handleSetEditing: (value: boolean) => void
  handlePrepareToEdit: (descripcion: string, value: number) => void
  handleComentarioSave: () => void
  comentario: string
  handleSetComentarioId: (id: number) => void
}

const Comentario: React.FC<IComentarioProps> = (props: IComentarioProps) => {
  const {
    handleComentarioSave,
    handleSetComentario,
    comentario,
    loading,
    editing,
    handleSetEditing,
    handlePrepareToEdit,
    comentarios,
    handleOpen,
    handleSetComentarioId
  } = props
  return (
    <>
      <Grid
        container
        spacing={1}
        justifyContent="flex-end"
        style={{ marginBottom: 16 }}
        padding={2}
      >
        <Grid item xs={12}>
          <Typography variant="h6">Comentarios</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            label="Nuevo comentario"
            multiline
            size="small"
            maxRows={8}
            fullWidth
            value={comentario ?? ''}
            onChange={({ target }): void => {
              handleSetComentario(target.value ?? '')
            }}
            disabled={loading}
            InputProps={
              loading
                ? {
                    startAdornment: (
                      <InputAdornment position="end">
                        <CircularProgress size={24} />
                      </InputAdornment>
                    )
                  }
                : {}
            }
          />
        </Grid>
        <Grid item>
          <Button
            color="primary"
            onClick={() => {
              handleComentarioSave()
            }}
            disabled={!comentario.trim().length || loading}
          >
            Guardar comentario
          </Button>
          {editing && (
            <Button
              color="primary"
              onClick={() => {
                handlePrepareToEdit('', 0)
                handleSetEditing(false)
              }}
              disabled={!comentario.trim().length || loading}
            >
              Cancelar
            </Button>
          )}
        </Grid>
        <Grid container spacing={4}>
          {comentarios?.map((x: IComentario) => (
            <Grid item md={4} key={x.id}>
              <CardMaterial>
                <CardContent>
                  <Typography variant="body2" component="p">
                    {x.descripcion}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {formatDate(x.fechaCreacion, false) + ' '}
                    &bull;
                    {' ' +
                      new Date(x.fechaCreacion)
                        .toLocaleTimeString('es-CL')
                        .slice(0, 5)}
                  </Typography>
                  <Typography variant="caption" color="primary">
                    {x.usuario}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    onClick={() => {
                      handlePrepareToEdit(x.descripcion, x.id)
                    }}
                    disabled={loading}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      handleOpen()
                      handleSetComentarioId(x.id)
                    }}
                    disabled={loading}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </CardMaterial>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export default Comentario
