import './Login.css'

import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const Login: React.FC = () => {
  return (
      <Container maxWidth="sm">
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '90vh' }}>
            <Grid item>
                <Paper sx={{ padding: '1.2em' }}>
                  <img
                      src="/static/images/full-logo.png"
                      alt="SentirCreativo"
                      className="logo"
                  />
                    <Typography variant="h5">Inicio de Sesión</Typography>
                    <Box component="form">
                          <TextField margin="normal" fullWidth label="correo electrónico" sx={{ mt: 2, mb: 1.5 }}/>
                          <TextField margin="normal" type="password" fullWidth label="contraseña" sx={{ mt: 2, mb: 1.5 }}/>
                      <Button fullWidth type="submit" variant="contained">Iniciar Sesión</Button>
                    </Box>
                  <Typography variant="body2" sx={{ p: 5, color: '#757575' }}>Copyright © Sentir Creativo 2023</Typography>
                </Paper>
            </Grid>
        </Grid>
      </Container>
  )
}

export default Login
