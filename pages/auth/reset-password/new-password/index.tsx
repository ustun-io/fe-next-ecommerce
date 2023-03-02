import { FC } from 'react'

import { AppProps } from 'next/app'

import { InputPassword } from '@module/auth/module/password-reset'
import { Container } from '@shared/component'

const NewPasswordPage: FC<AppProps> = () => {
  return (
    <Container className={'md:mt-[10rem]'}>
      <InputPassword />
    </Container>
  )
}

export default NewPasswordPage
