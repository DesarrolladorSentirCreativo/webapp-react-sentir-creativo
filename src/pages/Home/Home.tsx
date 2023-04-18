import React from 'react'

import { AppButton, Card } from '../../components/Controls'
import { AppButtonColor, AppButtonVariant } from '../../models/AppButton'

const Home: React.FC = () => {
  return <Card title={'Pagina Home'}>
    <AppButton text={'hola mundo'} variant={AppButtonVariant.contained} color={AppButtonColor.error}/>
  </Card>
}

export default Home
