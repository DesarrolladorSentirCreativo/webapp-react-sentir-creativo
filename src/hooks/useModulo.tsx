import { useState } from 'react'

import { type ISelectModulo } from '../models'
import moduloService from '../services/modulo.service'

interface Props {
  modulos: ISelectModulo[]
  loadModulos: () => Promise<void>
}

const useModulo = (): Props => {
  const [modulos, setModulos] = useState<ISelectModulo[]>([])

  const loadModulos = async (): Promise<void> => {
    const data = await moduloService.select()
    setModulos(data)
  }

  return {
    modulos,
    loadModulos
  }
}

export default useModulo
