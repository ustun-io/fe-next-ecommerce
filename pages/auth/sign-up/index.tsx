import { FC } from 'react'

import { AppProps } from 'next/app'

import { SignUpForm } from '@module/auth/component/sign-up.component'
import { Container } from '@shared/component'

const SignUpPage: FC<AppProps> = () => {
  return (
    <Container className={'md:mt-[10rem]'}>
      <SignUpForm />
    </Container>
  )
}

export default SignUpPage
