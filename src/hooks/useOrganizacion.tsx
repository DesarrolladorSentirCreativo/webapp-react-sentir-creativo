import { useState } from 'react'

import { type SelectOrganizacion } from '../models/organizacion'
import organizacionService from '../services/organizacion.service'

interface Props {
  organizaciones: SelectOrganizacion[]
  loadOrganizaciones: () => Promise<void>
}

const useOrganizacion = (): Props => {
  const [organizaciones, setOrganizaciones] = useState<SelectOrganizacion[]>([])

  const loadOrganizaciones = async (): Promise<void> => {
    const data = await organizacionService.select()
    setOrganizaciones(data)
  }

  return {
    organizaciones,
    loadOrganizaciones
  }
}

export { useOrganizacion }
