import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useAuthenticated } from '@store/auth/auth.store'

const Auth = () => {
  const isAuthenticated = useAuthenticated()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) router.push('/')
    router.push('/auth/sign-in')
  }, [isAuthenticated])
}

export default Auth
