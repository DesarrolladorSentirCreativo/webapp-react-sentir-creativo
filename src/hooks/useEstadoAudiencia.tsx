import { useState } from 'react'

import { type SelectEstadoAudiencia } from '../models'
import estadoAudienciaService from '../services/estadoAudiencia.service'

interface Props {
  estadoAudiencias: SelectEstadoAudiencia[]
  loadEstadoAudiencias: () => Promise<void>
}

const useEstadoAudiencia = (): Props => {
  const [estadoAudiencias, setEstadoAudiencias] = useState<
    SelectEstadoAudiencia[]
  >([])

  const loadEstadoAudiencias = async (): Promise<void> => {
    const data = await estadoAudienciaService.select()
    setEstadoAudiencias(data)
  }

  return {
    estadoAudiencias,
    loadEstadoAudiencias
  }
}

export { useEstadoAudiencia }
