import './Login.css'

import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

interface LoginType {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginType>({
    email: '',
    password: ''
  })

  const handleChangeEventLogin = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault()
    console.log(loginData)
  }

  return (
        <Container maxWidth='sm'>
            <Grid container direction='column' alignItems='center' justifyContent='center' sx={{ minHeight: '90vh' }}>
                <Grid item>
                    <Paper sx={{ padding: '1.2em' }}>
                        <img
                            src='/static/images/full-logo.png'
                            alt='SentirCreativo'
                            className='logo'
                        />
                        <Typography variant='h5'>Inicio de Sesión</Typography>
                        <Box component='form' onSubmit={handleSubmit}>
                            <TextField type='email' name='email' margin='normal' fullWidth label='correo electrónico'
                                       sx={{ mt: 2, mb: 1.5 }} required onChange={handleChangeEventLogin}/>
                            <TextField name='password' margin='normal' type='password' fullWidth label='contraseña'
                                       sx={{ mt: 2, mb: 1.5 }} required onChange={handleChangeEventLogin}/>
                            <Button fullWidth type='submit' variant='contained'>Iniciar Sesión</Button>
                        </Box>
                        <Typography variant='body2' sx={{ p: 5, color: '#757575' }}>Copyright © Sentir Creativo
                            2023</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
  )
}

export default Login
