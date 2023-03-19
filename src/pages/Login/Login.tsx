import './Login.css'

import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'

interface LoginType {
  email: string
  password: string
}

const Login: React.FC = () => {
  const formik = useFormik<LoginType>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup
        .string().trim()
        .email('El correo electrónico es invalido')
        .required('El correo electrónico es obligatorio'),
      password: yup
        .string()
        .trim()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria')
    }
    ),
    onSubmit: (value) => {
      console.log('funciona')
    }

  })
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
                        <Box component='form' onSubmit={formik.handleSubmit}>
                            <TextField name='email' margin='normal' fullWidth label='correo electrónico'
                                       sx={{ mt: 2, mb: 1.5 }} required value={formik.values.email}
                                       onChange={formik.handleChange}
                                       error={(formik.touched.email === true) && Boolean(formik.errors.email)}
                                       helperText={(formik.touched.email === true) && formik.errors.email} />
                            <TextField name='password' margin='normal' type='password' fullWidth label='contraseña'
                                       sx={{ mt: 2, mb: 1.5 }} required
                                       value={formik.values.password}
                                       onChange={formik.handleChange}
                                       error={(formik.touched.password === true) && Boolean(formik.errors.password)}
                                       helperText={(formik.touched.password === true) && formik.errors.password} />
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
