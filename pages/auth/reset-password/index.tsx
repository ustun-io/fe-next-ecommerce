import { FC } from 'react'

import { AppProps } from 'next/app'

import { InputEmail } from '@module/auth/module/password-reset'
import { Container } from '@shared/component'

const PasswordResetPage: FC<AppProps> = () => {
  return (
    <Container className={'md:mt-[10rem]'}>
      <InputEmail />
    </Container>
  )
}

export default PasswordResetPage
