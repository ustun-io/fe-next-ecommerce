import { FC } from 'react'

import { AppProps } from 'next/app'

import { SignInForm } from '@module/auth/component/sign-in.component'
import { Container } from '@shared/component'

const SignInPage: FC<AppProps> = () => {
  return (
    <Container className={'md:mt-[10rem]'}>
      <SignInForm />
    </Container>
  )
}

export default SignInPage
