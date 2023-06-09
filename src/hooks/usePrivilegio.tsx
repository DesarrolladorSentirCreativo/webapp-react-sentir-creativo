import { useState } from 'react'

import { type ISelectPriviilegio } from '../models'
import privilegioService from '../services/privilegio.service'

interface UsePrivilegioInterface {
  privilegios: ISelectPriviilegio[]
  loadPrivilegios: () => Promise<void>
}

const usePrivilegio = (): UsePrivilegioInterface => {
  const [privilegios, setPrivilegios] = useState<ISelectPriviilegio[]>([])

  const loadPrivilegios = async (): Promise<void> => {
    const data = await privilegioService.select()
    setPrivilegios(data)
  }

  return {
    privilegios,
    loadPrivilegios
  }
}

export default usePrivilegio
