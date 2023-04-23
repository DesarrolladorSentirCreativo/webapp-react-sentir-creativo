import { Autocomplete, Grid, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'

import { Card } from '../../components/Controls'
import { useAntiguedad, useCercania, useEstadoAudiencia, useOrganizacion } from '../../hooks'

const CreateFormAudiencia: React.FC = () => {
  const { estadoAudiencias, loadEstadoAudiencias } = useEstadoAudiencia()
  const { organizaciones, loadOrganizaciones } = useOrganizacion()
  const { antiguedades, loadAntiguedades } = useAntiguedad()
  const { cercanias, loadCercanias } = useCercania()

  useEffect(() => {
    if (estadoAudiencias.length <= 0) loadEstadoAudiencias()

    if (organizaciones.length <= 0) loadOrganizaciones()

    if (antiguedades.length <= 0) loadAntiguedades()

    if (cercanias.length <= 0) loadCercanias()
  }, [])

  return (
    <Card title="Formulario">
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        Formulario para Creación de Audiencia
      </Typography>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField name="nombre" label="Nombre" fullWidth required size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField name="apellido" label="Apellido" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField name="documentoIdentidad" label="Documento Identidad" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            disablePortal
            fullWidth
            size="small"
            id="estadoAudiencia"
            options={estadoAudiencias}
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => <TextField {...params} fullWidth label="Estado Audiencia" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            disablePortal
            fullWidth
            size="small"
            id="organizacion"
            options={organizaciones}
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => <TextField {...params} fullWidth label="Organización" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField name="celular" label="Teléfono" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField name="email" label="Email" fullWidth required size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField name="email2" label="Email 2" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField name="profesion" label="Profesión" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField name="cargo" label="Cargo" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField name="departamento" label="Departamento" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField name="profesion" label="Prefesión" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            disablePortal
            fullWidth
            size="small"
            id="antiguedad"
            options={antiguedades}
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => <TextField {...params} fullWidth label="Antiguedad" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            disablePortal
            fullWidth
            size="small"
            id="cercania"
            options={cercanias}
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => <TextField {...params} fullWidth label="Cercania" />}
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default CreateFormAudiencia
