// TODO: Fix comment
import { useEffect, useState } from 'react'

export const hasHydrated = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [hasBeenHydrated, setHasHydrated] = useState<boolean>(false)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setHasHydrated(true)
  }, [])

  return hasBeenHydrated
}
