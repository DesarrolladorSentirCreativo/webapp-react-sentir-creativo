import React from 'react'

import { AppButton, Card } from '../../components/Controls'
import { AppButtonColor, AppButtonType, AppButtonVariant } from '../../models'

const Home: React.FC = () => {
  return <Card title={'Pagina Home'}>
    <AppButton text={'Crear Audiencia'} variant={AppButtonVariant.contained} color={AppButtonColor.error} type={AppButtonType.button}/>
  </Card>
}

export default Home
