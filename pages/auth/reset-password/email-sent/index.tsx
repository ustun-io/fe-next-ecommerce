import { FC } from 'react'

import { AppProps } from 'next/app'

import { EmailSentConfirmation } from '@module/auth/module/password-reset'
import { Container } from '@shared/component'

const EmailSentPage: FC<AppProps> = () => {
  return (
    <Container className={'md:mt-[10rem]'}>
      <EmailSentConfirmation />
    </Container>
  )
}

export default EmailSentPage
