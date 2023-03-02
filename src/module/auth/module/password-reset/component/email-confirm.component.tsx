import { FC } from 'react'

import Image from 'next/image'

import { RESET_PASSWORD_SUCCESS } from '@module/auth/constant'
import { censorEmail } from '@shared/util'
import useAuthStore from '@store/auth/auth.store'
import { shallow } from 'zustand/shallow'

export const EmailSentConfirmation: FC = () => {
  const { email } = useAuthStore((state) => state, shallow)

  return (
    <div className={'flex flex-col items-center'}>
      <Image src={'/image/icon/mail-icon-light.png'} alt={'email icon'} width={128} height={128} />
      <p className={'text-secondary-100 text-base font-inter tracking-wide text-center'}>
        {RESET_PASSWORD_SUCCESS(censorEmail(email as string))}
      </p>
    </div>
  )
}
